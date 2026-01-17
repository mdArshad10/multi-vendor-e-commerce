import { ErrorRequestHandler } from "express";
import { ErrorHandler } from "../http";


export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error({ err }, 'Unhandled error occurred');

    const error = err instanceof ErrorHandler ? err : undefined;
    const statusCode = error?.statusCode ?? 500;
    const message = statusCode >= 500 ? 'Internal Server Error' : (error?.message ?? 'Unknown Error');
    const payload = error?.stack ? { message, stack: error.stack } : { message };

    res.status(statusCode).json(payload);

    void _next();
};
