import { IPurchase } from "../../models/purchase.model";

export interface IPurchaseService {
  purchaseBook(
    userId: string,
    bookId: string,
    quantity: number
  ): Promise<IPurchase>;
  getUserPurchases(userId: string): Promise<IPurchase[]>;
}
