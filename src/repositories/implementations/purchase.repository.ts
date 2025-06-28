import { BaseRepository } from "../base/base.repository";
import PurchaseModel, { IPurchase } from "../../models/purchase.model";
import { IPurchaseRepository } from "../interfaces/ipurchase.repository";

export class PurchaseRepository
  extends BaseRepository<IPurchase>
  implements IPurchaseRepository
{
  constructor() {
    super(PurchaseModel);
  }

  async findByUserId(userId: string): Promise<IPurchase[]> {
    return await PurchaseModel.find({ userId }).populate({
        path: "bookId",
        select: 'title description authors',
        populate : {
            path : 'authors',
            select : 'name'
        }
    });
  }

  async findByBookId(bookId: string): Promise<IPurchase[]> {
    return this.findAll({ bookId });
  }
}
