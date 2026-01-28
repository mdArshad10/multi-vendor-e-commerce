import "dotenv/config";
import { createEnv, z } from "@multi-vendor-e-commerce/common";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    GATEWAY_SERVICE_PORT: z.string().default("5000"),
    AUTH_SERVICE_PORT: z.string().default("3000"),
    PRODUCT_SERVICE_PORT:z.string().default("4000"),
    JWT_SECRET: z.string(),
    INTERNAL_TOKEN_SECRET: z.string(),
    INTERNAL_TOKEN_EXPIRES_IN: z.string(),
    FRONTEND_API:z.url()
})

type EnvType = z.infer<typeof envSchema>;


export const env: EnvType = createEnv(envSchema);
