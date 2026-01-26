import "dotenv/config";
import { createEnv, z } from "@multi-vendor-e-commerce/common";


const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    AUTH_SERVICE_PORT: z.string().default("3000"),
    NODEMAILER_HOST: z.string(),
    NODEMAILER_PORT: z.coerce.number(),
    NODEMAILER_USER: z.string(),
    NODEMAILER_PASSWORD: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
    INTERNAL_TOKEN_SECRET:z.string(),
    INTERNAL_TOKEN_EXPIRES_IN: z.string(),
    STRIPE_SECRET_KEY:z.string()
})

type EnvType = z.infer<typeof envSchema>;


export const env: EnvType = createEnv(envSchema);
