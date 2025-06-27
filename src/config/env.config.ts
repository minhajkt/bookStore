import dotenv from "dotenv";

dotenv.config();

export const config = {
  corsOrigin: process.env.CORS_ORIGIN || "*",
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
};