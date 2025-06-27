import { IPurchase } from "../../models/purchase.model";
import { IBaseRepository } from "../base/base.repository";

export interface IPurchaseRepository extends IBaseRepository<IPurchase> {
  findByUserId(userId: string): Promise<IPurchase[]>;
  findByBookId(bookId: string): Promise<IPurchase[]>;
}
