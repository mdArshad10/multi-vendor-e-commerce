import "dotenv/config";
import { createEnv, z } from "@multi-vendor-e-commerce/common";


const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    ORDER_SERVICE_PORT: z.string().default("4010"),
})

type EnvType = z.infer<typeof envSchema>;


export const env: EnvType = createEnv(envSchema);
