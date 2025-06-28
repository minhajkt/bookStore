import { IRevenue } from "../../models/revenue.model";
import RevenueModel from "../../models/revenue.model";
import { IRevenueRepository } from "../interfaces/irevenue.repository";
import { BaseRepository } from "../base/base.repository";
import mongoose from "mongoose";

export class RevenueRepository
  extends BaseRepository<IRevenue>
  implements IRevenueRepository
{
  constructor() {
    super(RevenueModel);
  }

  async findByAuthorId(authorId: string): Promise<IRevenue[]> {
    return RevenueModel.find({
      authorId: new mongoose.Types.ObjectId(authorId),
    })
      .populate("bookId", "title")
      .populate({
        path: "purchaseId",
        select: "purchaseDate price quantity userId",
        populate: {
          path: "userId",
          select: "name",
        },
      });
  }

  async getTotalRevenueByAuthor(authorId: string): Promise<number> {
    const result = await RevenueModel.aggregate([
      { $match: { authorId: new mongoose.Types.ObjectId(authorId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return result.length > 0 ? result[0].total : 0;
  }
}
