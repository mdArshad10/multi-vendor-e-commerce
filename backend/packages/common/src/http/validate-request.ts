import type { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError, ZodTypeAny } from "zod";
import { ErrorHandler } from "./httpError.js";

type Schema = ZodObject | ZodTypeAny;
type ParamsRecord = Record<string, string>;
type QueryRecord = Record<string, unknown>;

type ValidateRequest = {
    body: Schema;
    params?: Schema;
    query?: Schema;
}

const formatedError = (error: any) =>
    error.errors.map((issue: any) => ({
        path: issue.path.join("."),
        message: issue.message,
    }));

export const validateRequest = (schema: ValidateRequest) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body) {
                const schemaData = schema.body.parse(req.body);
                req.body = schemaData;
            }
            if (req.params) {
                const schemaData = schema.params?.parse(req.params) as ParamsRecord;
                req.params = schemaData as Request["params"];
            }
            if (req.query) {
                const schemaData = schema.query?.parse(req.query) as QueryRecord;
                req.query = schemaData as Request["query"];
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                next(
                    new ErrorHandler("Validation Error", 422, false, {
                        issues: formatedError(error),
                    }),
                );
                return;
            }

            next(error);
        }
    }
}