import { z } from "zod";
import dotenv from "dotenv";

// Load environment-specific .env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${nodeEnv}` });
dotenv.config(); // Also load .env for fallback

// Define environment variables schema
const envSchema = z.object({
  // Server
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // Database - Support both development and production URLs
  MONGODB_URI: z.string(),
  MONGODB_USER: z.string().optional(),
  MONGODB_PASSWORD: z.string().optional(),
  MONGODB_PROJECT: z.string().optional(),

  SWAGGER_BASE_URL: z.string().default("http://localhost:3000/api"),

  // Authentication
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("24h"),
  COOKIE_EXPIRES_IN: z.string().default("90d"),

  // App settings
  APP_NAME: z.string().default("DevWave E-commerce"),
});

// Validate environment variables
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;

// Function to get the appropriate database URL based on environment
// export const getDatabaseUrl = (): string => {
//   if (env.NODE_ENV === "production" && env.DATABASE_URL_PROD) {
//     return env.DATABASE_URL_PROD;
//   }

//   if (env.NODE_ENV === "development" && env.DATABASE_URL_DEV) {
//     return env.DATABASE_URL_DEV;
//   }

//   // Fallback to the main DATABASE_URL
//   return env.DATABASE_URL;
// };
