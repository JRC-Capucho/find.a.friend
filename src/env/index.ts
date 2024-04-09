import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["prod", "dev", "stage"]).default("dev"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables ", _env.error.format());
  throw new Error("Invalid environment variables.");
}

const env = _env.data;

export { env };
