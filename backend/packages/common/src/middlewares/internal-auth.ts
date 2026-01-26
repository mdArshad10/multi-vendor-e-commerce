import { NextFunction, Request, Response } from "express";
import { AuthError, ErrorHandler } from "../http";
import { AccessTokenClaims } from "../type/express";
import { jwt } from "../utils/jwt";

export interface InternalAuthOptions {
    headerName?: string;
    exemptPaths?: string[];
}

const DEFAULT_HEADER_NAME = "x-internal-token";

export const InternalAuthMiddleware = (
    expectedToken: string,
    options: InternalAuthOptions = {}) => {
    const headerName = options.headerName ?? DEFAULT_HEADER_NAME;
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const token = req.header(headerName);
            console.log("the token is ", token);

            if (!token) {
                throw new ErrorHandler("token is not exist", 401)
            }
            console.log("the expected token is ", expectedToken);
            const decode = jwt.verify(token, expectedToken) as any;
            console.log("the decode is ", decode);

            if (!decode) {  // ← Fixed: was "if (decode)" which is inverted!
                throw new ErrorHandler("invalid token", 401)
            }
            const user = {
                userId: decode.userId,
                role: decode.role
            }
            console.log("the user is ", user);

            req.user = user as unknown as AccessTokenClaims;
            next();
        } catch (error) {
            console.log("the error is ", error);
            next(error)
        }
    }
}

export const IsSeller = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as AccessTokenClaims;
        if (user.role != "seller") {
            throw new AuthError()
        }
    } catch (error) {
        next(error);
    }
}

export const IsUser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const user = req.user as AccessTokenClaims;
        if (user.role != "user") {
            throw new AuthError()
        }
    } catch (error) {
        next(error);
    }
}