import 'dotenv/config'
import express from 'express'
import type { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'
import rateLimiter from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import axios from 'axios'
import { errorHandler } from '@multi-vendor-e-commerce/common'
import { env } from './config/env'
import { registerRoutes } from './routes'



export const createApp = (): Application => {
    const app = express();

    const limiter = rateLimiter({})

    // CORS and basic middleware first
    app.use(cors({
        origin: "*",
    }))
    app.use(morgan("dev"))
    app.use(cookieParser())
    app.set("trust proxy", 1)
    app.use(limiter)

    // Proxy routes BEFORE express.json() to preserve raw body stream
    app.use('/auth', createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/auth': '' }
    }))// auth-service

    // Body parsing AFTER proxy routes
    app.use(express.json({ limit: "100mb" }))
    app.use(express.urlencoded({ extended: true, limit: "100mb" }))

    app.use(errorHandler)

    registerRoutes(app)

    return app;
}