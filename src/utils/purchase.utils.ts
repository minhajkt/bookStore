import mongoose from "mongoose";
import PurchaseModel from "../models/purchase.model";
import BookModel from "../models/books.model";

export const getRecentPurchasesForAuthor = async (
  authorId: string,
  timeWindowInMinutes: number = 5
//   timeWindowInMinutes: number = 1440
) => {
  const authorObjectId = new mongoose.Types.ObjectId(authorId);

  const booksByAuthor = await BookModel.find(
    { authors: authorObjectId },
    "_id"
  );

  const bookIds = booksByAuthor.map((book) => book._id);

  if (bookIds.length === 0) return [];

  const since = new Date(Date.now() - timeWindowInMinutes * 60 * 1000);

  const purchases = await PurchaseModel.find({
    bookId: { $in: bookIds },
    createdAt: { $gte: since },
  })
    .populate("bookId", "title")
    .populate("userId", "name email");

  return purchases;
};
