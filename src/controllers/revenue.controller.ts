import { Request, Response, NextFunction } from "express";
import { IRevenueService } from "../services/interfaces/irevenue.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class RevenueController {
  private revenueService: IRevenueService;

  constructor(revenueService: IRevenueService) {
    this.revenueService = revenueService;
  }

  async getAuthorRevenue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authorId = req.user?.id;

      if (!authorId) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.USER.UNAUTHORIZED,
        });
        return;
      }

      const revenue = await this.revenueService.getAuthorRevenue(authorId);

      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.REVENUE.FETCHED,
        revenue,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAuthorTotalRevenue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authorId = req.user?.id;

      if (!authorId) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.USER.UNAUTHORIZED,
        });
        return;
      }

      const total = await this.revenueService.getAuthorTotalRevenue(authorId);

      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.REVENUE.FETCHED_TOTAL,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
}
