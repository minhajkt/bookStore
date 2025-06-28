import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/jwt";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload | undefined;
    if (!user || !user.role || !roles.includes(user.role)) {
       res.status(403).json({ message: "Access denied" });
       return;
    }
    next();
  };
};
