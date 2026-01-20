// src/types/express.d.ts
export interface AccessTokenClaims {
    userId: string;
    role: 'user' | 'seller';
}

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenClaims;
        }
    }
}

export { };