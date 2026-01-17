import express from 'express';
import type { Application } from 'express'
import { registerRoutes } from './routes';
import { errorHandler } from '@multi-vendor-e-commerce/common';

export const createApp = (): Application => {
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    registerRoutes(app);
    app.use(errorHandler)

    return app;
}