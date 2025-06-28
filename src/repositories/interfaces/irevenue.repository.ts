import { IRevenue } from "../../models/revenue.model";
import { IBaseRepository } from "../base/base.repository";

export interface IRevenueRepository extends IBaseRepository<IRevenue> {
  findByAuthorId(authorId: string): Promise<IRevenue[]>;
  getTotalRevenueByAuthor(authorId: string): Promise<number>;
}
