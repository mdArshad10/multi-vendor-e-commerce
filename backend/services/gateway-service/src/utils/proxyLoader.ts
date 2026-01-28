import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { gatewayAuthMiddleware } from '../middlewares/getAuth.middlewar';
import { routeConfigs } from '../config/routes.config';

export const loadProxyRoutes = (app: Application) => {
    routeConfigs.forEach(config => {
        const middlewares: any[] = [];
        // Add auth middleware if required
        if (config.auth) {
            middlewares.push(gatewayAuthMiddleware);
        }

        // Add proxy middleware
        middlewares.push(createProxyMiddleware({
            target: config.target,
            changeOrigin: true,
            pathRewrite: config.pathRewrite,
        }));

        app.use(config.path, ...middlewares);
    });
};