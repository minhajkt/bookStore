import { endOfMonth, startOfMonth } from "date-fns";
import { IRevenue } from "../../models/revenue.model";
import { IRevenueRepository } from "../../repositories/interfaces/irevenue.repository";
import { IRevenueService } from "../interfaces/irevenue.service";

export class RevenueService implements IRevenueService {
  private revenueRepo: IRevenueRepository;

  constructor(revenueRepo: IRevenueRepository) {
    this.revenueRepo = revenueRepo;
  }

  async getAuthorRevenue(authorId: string): Promise<IRevenue[]> {
    return await this.revenueRepo.findByAuthorId(authorId);
  }

  async getAuthorTotalRevenue(authorId: string): Promise<number> {
    return await this.revenueRepo.getTotalRevenueByAuthor(authorId);
  }

  async getMonthlyRevenueSummaryForAuthor(
    authorId: string,
    month: number,
    year: number
  ): Promise<number> {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(start);

    const revenues = await this.revenueRepo.findAll({
      authorId,
      createdAt: { $gte: start, $lte: end },
    });

    return revenues.reduce((sum, r) => sum + r.amount, 0);
  }
}
