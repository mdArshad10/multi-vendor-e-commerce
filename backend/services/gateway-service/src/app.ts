import 'dotenv/config'
import express from 'express'
import type { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import proxy from 'express-http-proxy'
import cookieParser from 'cookie-parser'
import rateLimiter from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import axios from 'axios'
import { errorHandler } from '@multi-vendor-e-commerce/common'
import { env } from './config/env'



export const createApp = (): Application => {
    const app = express();

    const limiter = rateLimiter({})

    app.use(express.json({ limit: "100mb" }))
    app.use(express.urlencoded({ extended: true, limit: "100mb" }))
    app.use(cors({
        origin: "*",
        allowedHeaders: ["Authorization", "Content-Type"]
    }))
    app.use(morgan("dev"))
    app.use(cookieParser())
    app.set("trust proxy", 1)
    app.use(limiter)
    app.use('/', proxy(`http://localhost:${env.AUTH_SERVICE_PORT}`))// auth-service
    app.use(errorHandler)

    return app;
}