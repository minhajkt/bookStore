import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { verifyAccessToken } from "../utils/jwt";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: MESSAGES.TOKEN.NO_ACCESS_TOKEN });
    return;
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: MESSAGES.TOKEN.INVALID_ACCESS_TOKEN });
    return;
  }

  (req as any).user = decoded;
  next();
};
