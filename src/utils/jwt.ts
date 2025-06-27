import jwt from "jsonwebtoken";
import { config } from "../config/env.config";
import { JwtPayload } from "../types/jwt";

const ACCESS_SECRET = config.accessToken!;
const REFRESH_SECRET = config.refreshToken!;

export const generateAccessToken = (data: object) => {
  return jwt.sign(data, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (data: object) => {
  return jwt.sign(data, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string):JwtPayload | null => {
  try {
    const decoded = jwt.verify(
      token,
      ACCESS_SECRET!
    ) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
};
