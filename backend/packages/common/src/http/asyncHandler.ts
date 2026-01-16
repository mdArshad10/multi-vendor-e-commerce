import { Request, Response, NextFunction } from 'express'

export type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>

type ErrorForwarder = (error: Error) => void;

const toError = (error: unknown): Error => {
    return error instanceof Error ? error : new Error(String(error))
}

const forwardError = (error: unknown, next: ErrorForwarder) => {
    next(toError(error))
}

export const asyncHandler = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch((error: unknown) => forwardError(error, next))