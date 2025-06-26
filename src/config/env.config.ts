import dotenv from "dotenv";

dotenv.config();

export const config = {
  corsOrigin: process.env.CORS_ORIGIN || "*",
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
};