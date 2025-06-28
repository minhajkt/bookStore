import UserModel from "../models/user.model";
import { EmailService } from "../services/email.service";
import { chunkArray } from "../utils/array.utils";

export const sendNewBookReleaseEmails = async (books: { title: string; author: string }[]) => {
  console.log("Starting bulk email job for new book releases...");

  const allBuyers = await UserModel.find({ role: "buyer" }, "name email");
  const buyerChunks = chunkArray(allBuyers, 100);

  for (let i = 0; i < buyerChunks.length; i++) {
    const chunk = buyerChunks[i];

    await Promise.all(
      chunk.map((buyer) =>
        EmailService.sendNewBookRelease({
          to: buyer.email,
          name: buyer.name,
          books,
        })
      )
    );

    console.log(`Sent batch ${i + 1} of ${buyerChunks.length}`);

    if (i !== buyerChunks.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
    }
  }

  console.log("All promotional emails sent.");
};
