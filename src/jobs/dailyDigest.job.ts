import cron from "node-cron";
import { sendDailyAuthorDigest } from "./dailyAuthorDigest.job";

console.log("Cron job file loaded");

cron.schedule(
  "*/5 * * * *",
  //   "0 8 * * *",
  async () => {
    console.log(
      "Starting Daily Author Digest Cron Job...",
      new Date().toLocaleString()
    );
    await sendDailyAuthorDigest();
  },
  {
    timezone: "Asia/Kolkata",
  }
);
