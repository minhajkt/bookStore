import { IRevenue } from "../../models/revenue.model";

export interface IRevenueService {
  getAuthorRevenue(authorId: string): Promise<IRevenue[]>;
  getAuthorTotalRevenue(authorId: string): Promise<number>;
}
