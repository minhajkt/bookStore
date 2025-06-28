import BookModel from "../models/books.model";

export const getRecentBooks = async (
  sinceInMinutes: number = 1440 
) => {
  const since = new Date(Date.now() - sinceInMinutes * 60 * 1000);

  const recentBooks = await BookModel.find({
    createdAt: { $gte: since },
  }).populate("authors", "name email"); 

  return recentBooks;
};
