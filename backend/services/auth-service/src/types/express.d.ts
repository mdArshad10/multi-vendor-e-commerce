// src/types/express.d.ts

import { AccessTokenClaims } from "@multi-vendor-e-commerce/common/src/type/express";

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenClaims;
        }
    }
}

export { };