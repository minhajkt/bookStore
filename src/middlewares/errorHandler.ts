import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message || MESSAGES.SERVER.ERROR,
  });
};
