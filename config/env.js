import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
    PORT,
    NODE_ENV,
    DATABASE_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    SERVER_URL, 
    EMAIL_PASSWORD,
    EMAIL_USER,
} = process.env;
