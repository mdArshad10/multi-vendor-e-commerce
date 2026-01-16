import { env } from "@/config/env";
import type { Router } from "express";


export const registerRoutes = (app: Router) => {
    app.get("/health", (req, res) => {
        res.json({
            status: "ok",
            service: "gateway-service",
            environment: env.NODE_ENV,
            port: env.PORT,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.env.npm_package_version || '1.0.0'
        });
    })

}
