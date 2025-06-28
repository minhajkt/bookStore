import { UserRepository } from "../repositories/implementations/user.repository";
import { EmailService } from "../services/email.service";
import { getRecentPurchasesForAuthor } from "../utils/purchase.utils";

export const sendDailyAuthorDigest = async () => {
  try {
    const userRepo = new UserRepository();

    const authors = await userRepo.findAll({ role: "author" });

    for (const author of authors) {
      const purchases = await getRecentPurchasesForAuthor(author._id.toString(),5)

      if (purchases.length === 0) continue;

      await EmailService.sendDailyDigest({
        to: author.email,
        name: author.name,
        purchases,
      });
    }

    console.log("Daily digest job completed");
  } catch (error) {
    console.error("Error in daily digest job:", error);
  }
};
