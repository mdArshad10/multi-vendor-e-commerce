import "dotenv/config";
import { createEnv, z } from "@multi-vendor-e-commerce/common";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    GATEWAY_SERVICE_PORT: z.coerce.number().default(4000),
    AUTH_SERVICE_PORT: z.coerce.number().default(6001),
})

type EnvType = z.infer<typeof envSchema>;


export const env: EnvType = createEnv(envSchema);
