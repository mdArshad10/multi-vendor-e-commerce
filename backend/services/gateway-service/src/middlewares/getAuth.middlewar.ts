import { env } from "@/config/env";
import { ErrorHandler, HttpResponse } from "@multi-vendor-e-commerce/common";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

interface AccessTokenClaims {
    userId: string;
    role: 'user' | 'seller';
}


const parseAuthorizationHeader = (value: string | undefined): string => {
    if (!value) {
        throw new ErrorHandler('Unauthorized', 401);
    }

    const [scheme, token] = value.split(' ');

    if (scheme.toLowerCase() !== 'bearer' || !token) {
        throw new ErrorHandler('Unauthorized', 401);
    }

    return token;
};

export const getwayAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || parseAuthorizationHeader(req.headers.authorization);
    if (!token) {
        return res.status(401).json(
            HttpResponse.unauthorized()
        )
    }
    try {

        const decoded = jwt.verify(token, env.JWT_SECRET) as AccessTokenClaims;
        if (!decoded) {
            return res.status(401).json(
                HttpResponse.unauthorized()
            )
        }
        const internalToken = jwt.sign({
            source: 'gateway', timestamp: Date.now(),
            userId: decoded.userId,
            role: decoded.role
        }, env.INTERNAL_TOKEN_SECRET as string, {
            expiresIn: env.INTERNAL_TOKEN_EXPIRES_IN as string as unknown as number
        })

        req.headers["x-internal-token"] = internalToken;

        next();
    } catch (error) {
        return res.status(401).json(
            HttpResponse.unauthorized()
        )
    }

}

