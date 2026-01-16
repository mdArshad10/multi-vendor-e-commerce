import "dotenv/config";
import { createEnv, z } from "@multi-vendor-e-commerce/common";

// host: "smtp.ethereal.email",
//     port: 587,
//         secure: false, // Use true for port 465, false for port 587
//             auth: {
//     user: "maddison53@ethereal.email",
//         pass: "jn7jnAPss4f63QBp6D",
//     },

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(3000),
    NODEMAILER_HOST: z.string(),
    NODEMAILER_PORT: z.coerce.number(),
    NODEMAILER_USER: z.string(),
    NODEMAILER_PASSWORD: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
})

type EnvType = z.infer<typeof envSchema>;


export const env: EnvType = createEnv(envSchema);
