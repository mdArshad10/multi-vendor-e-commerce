// src/types/express.d.ts
import { AccessTokenClaims } from '../middlewares/getAuth.middlewar';

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenClaims;
        }
    }
}

export { };