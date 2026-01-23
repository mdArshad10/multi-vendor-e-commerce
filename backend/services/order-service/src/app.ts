import express from 'express';
import type { Application,Request,Response } from 'express'
import { registerRoutes } from './routes';
import { errorHandler } from '@multi-vendor-e-commerce/common';

export const createApp = (): Application => {
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.get("/", (req:Request, res:Response) => {
        res.status(200).json({ message: "success at order-service" })
    })

    registerRoutes(app);
    app.use(errorHandler)

    return app;
}