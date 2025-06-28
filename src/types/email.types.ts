import { IPurchase } from "../models/purchase.model";

export interface DailyDigestOptions {
  to: string;
  name: string;
  purchases: IPurchase[];
}
