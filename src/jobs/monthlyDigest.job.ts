import cron from "node-cron";
import { sendMonthlyRevenueDigest } from "./monthlyRevenueDigest.job";

cron.schedule(
  "0 9 1 * *",
// "*/5 * * * *",
  async () => {
    console.log("Triggering Monthly Revenue Digest Cron Job...");
    await sendMonthlyRevenueDigest();
  },
  {
    timezone: "Asia/Kolkata",
  }
);
