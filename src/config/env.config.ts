import dotenv from "dotenv";

dotenv.config();

export const config = {
  corsOrigin: process.env.CORS_ORIGIN || "*",
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM
};