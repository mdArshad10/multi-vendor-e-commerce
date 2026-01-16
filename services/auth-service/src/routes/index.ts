import { createApp } from "@/app";
import type { Router } from "express";


export const registerRoutes = (app: Router) => {
    app.get("/health", (req, res) => {
        res.json({ message: "ok" });
    })

}
