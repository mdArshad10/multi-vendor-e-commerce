import { env } from "@/config/env";
import type { Router, Request, Response } from "express";

import productRouter from "./product.route";

export const registerRoutes = (app: Router) => {
    app.get("/products/health", (_req: Request, res: Response) => {
        res.json({
            status: "ok",
            service: "product-service",
            environment: env.NODE_ENV,
            port: env.PRODUCT_SERVICE_PORT,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.env.npm_package_version || '1.0.0'
        });
    });

    app.use("/products", productRouter);
}
