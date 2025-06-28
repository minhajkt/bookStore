import UserModel from "../models/user.model";
import { getRecentPurchasesForAuthor } from "../utils/purchase.utils";
// import { EmailService } from "../services/email.service"; 

export const runDailyPurchaseDigestJob = async (
  timeWindowInMinutes: number = 1440 
) => {
  console.log("Running daily purchase digest job...");

  const authors = await UserModel.find({ role: "author" }, "_id name email");

  for (const author of authors) {
    const purchases = await getRecentPurchasesForAuthor(
      author._id.toString(),
      timeWindowInMinutes
    );

    if (purchases.length === 0) continue;

    await EmailService.sendDailyDigest({
      to: author.email,
      name: author.name,
      purchases,
    });
  }

  console.log("✅ Daily purchase digest job finished.");
};
