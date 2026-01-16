import z from "zod";
import { createEnv } from "../env";

const commonSchema = z.object({
    REDIS_URL: z.string(),
})

type CommonSchema = z.infer<typeof commonSchema>;

export const env: CommonSchema = createEnv(commonSchema);