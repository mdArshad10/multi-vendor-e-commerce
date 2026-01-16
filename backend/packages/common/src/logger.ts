import 'winston-daily-rotate-file'
import winston from 'winston'
import type { Logform, Logger } from 'winston'

interface LogInfo extends Logform.TransformableInfo {
    timestamp?: string;
    stack?: string;
    service?: string;
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

const baseFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    printf((info: LogInfo): string => {
        const { timestamp, level, message, stack, service } = info;

        return `${timestamp} [${service}] ${level}: ${stack ?? message
            }`;
    })
);

const consoleFormat = combine(
    colorize(),
    baseFormat
);

const getLogLevel = (): string => {
    return process.env.NODE_ENV === "production"
        ? "info"
        : "debug";
};

const { createLogger, transports } = winston;

interface CreateLoggerOptions {
    service: string;
}

export const createServiceLogger = (
    options: CreateLoggerOptions
): Logger => {
    const { service } = options;

    const isProduction = process.env.NODE_ENV === "production";

    return createLogger({
        level: getLogLevel(),

        defaultMeta: { service },

        format: baseFormat,

        transports: [
            new transports.DailyRotateFile({
                filename: "logs/error-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                level: "error",
                maxSize: "20m",
                maxFiles: "14d",
                zippedArchive: true,
            }),

            new transports.DailyRotateFile({
                filename: "logs/combined-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                level: "info",
                maxSize: "20m",
                maxFiles: "14d",
                zippedArchive: true,
            }),

            // Console only in development
            ...(isProduction
                ? []
                : [
                    new transports.Console({
                        format: consoleFormat,
                    }),
                ]),
        ],

        exceptionHandlers: [
            new transports.DailyRotateFile({
                filename: "logs/exceptions-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                maxSize: "20m",
                maxFiles: "14d",
            }),
        ],

        rejectionHandlers: [
            new transports.DailyRotateFile({
                filename: "logs/rejections-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                maxSize: "20m",
                maxFiles: "14d",
            }),
        ],
    });
};