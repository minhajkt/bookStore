import { format, subMonths } from "date-fns";
import { UserRepository } from "../repositories/implementations/user.repository";
import { RevenueService } from "../services/implementations/revenue.service";
import { EmailService } from "../services/email.service";
import { RevenueRepository } from "../repositories/implementations/revenue.repository";

export const sendMonthlyRevenueDigest = async () => {
  console.log("Starting Monthly Revenue Digest Job...");

  const userRepo = new UserRepository();
  const revenueRepo = new RevenueRepository();
  const revenueService = new RevenueService(revenueRepo);

  const authors = await userRepo.findAll({ role: "author" });

  const now = new Date();
    const lastMonth = subMonths(now, 1);
  const month = lastMonth.getMonth() + 1;
  const year = lastMonth.getFullYear();
  const monthName = format(lastMonth, "LLLL");

  for (const author of authors) {
    console.log(`\nChecking author: ${author.name} (${author.email})`);
    const amount = await revenueService.getMonthlyRevenueSummaryForAuthor(
      author._id.toString(),
      month,
      year
    );

    console.log(`Revenue for ${monthName} ${year}: ₹${amount}`);

    if (amount === 0) {
      console.log("No revenue, skipping email.");
      continue;
    }

    try {
      console.log(`Sending email to ${author.email}...`);
      await EmailService.sendMonthlyRevenueSummary({
        to: author.email,
        name: author.name,
        month: monthName,
        year,
        amount,
      });
      console.log(`Email sent to ${author.email}`);
    } catch (error) {
      console.error(`Failed to send email to ${author.email}`, error);
    }
  }

  console.log("Monthly revenue digest completed.");
};
