import "dotenv/config";
import { createEnv, z } from "@multi-vendor-e-commerce/common";

const commonSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    KAFKA_SERVICE_PORT: z.string(),
})

type CommonSchema = z.infer<typeof commonSchema>;

export const env: CommonSchema = createEnv(commonSchema);