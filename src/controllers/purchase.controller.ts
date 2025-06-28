import { NextFunction, Request, Response } from "express";
import { IPurchaseService } from "../services/interfaces/ipurchase.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class PurchaseController {
  private purchaseService: IPurchaseService;

  constructor(purchaseService: IPurchaseService) {
    this.purchaseService = purchaseService;
  }

  async purchaseBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      const { bookId, quantity } = req.body;

      if (!userId) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: MESSAGES.USER.UNAUTHORIZED });
        return;
      }

      if (!bookId || !quantity) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: MESSAGES.PURCHASE.NO_ID_QUANTITY });
        return;
      }

      const purchase = await this.purchaseService.purchaseBook(
        userId,
        bookId,
        quantity
      );

      res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.PURCHASE.CREATED,
        purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserPurchases(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
  
      if (!userId) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: MESSAGES.USER.UNAUTHORIZED });
        return;
      }
  
      const purchases = await this.purchaseService.getUserPurchases(userId);
  
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.PURCHASE.FETCHED,
        purchases,
      });
    } catch (error) {
      next(error);
    }
  }
  
}
