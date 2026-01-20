import { NextFunction,Request } from "express";
import jwt from "jsonwebtoken";
import { AuthError, ErrorHandler } from "../http";
import { AccessTokenClaims } from "../type/express";

export interface InternalAuthOptions {
  headerName?: string;
  exemptPaths?: string[];
}

const DEFAULT_HEADER_NAME="x-header-internal";

export const InternalAuthMiddleware = async(
    expectedToken:string,
    options:InternalAuthOptions={})=>{
    const headerName = options.headerName ?? DEFAULT_HEADER_NAME;
    const exemptPaths = new Set(options.exemptPaths ?? []);
    return (req:Request,_res:Response,next:NextFunction)=>{
        try {
            const fullPath = req.baseUrl + req.path;
            if(exemptPaths.has(fullPath)){
                next();
                return;
            }
            const token = req.header(headerName);
            if(!token){
                throw new ErrorHandler("token is not exist",404)
            }
            const decode = jwt.verify(token!,expectedToken) as any;
            if(decode){
                throw new ErrorHandler("invlide token",404)
            }
            const user = {
                id:decode.userId,
                role:decode.role
            }
            req.user = user as unknown as AccessTokenClaims;
            next();
        } catch (error) {
            next(error)
        }
    }
}

export const IsSeller=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = req.user as AccessTokenClaims;
        if(user.role != "seller"){
            throw new AuthError()
        }
    } catch (error) {
       next(error); 
    }
}

export const IsUser=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = req.user as AccessTokenClaims;
        if(user.role != "user"){
            throw new AuthError()
        }
    } catch (error) {
       next(error); 
    }
}