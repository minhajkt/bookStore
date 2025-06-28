import { HTTP_STATUS } from "../../constants/httpStatus";
import { MESSAGES } from "../../constants/messages";
import { AppError } from "../../errors/AppError";
import { IPurchase } from "../../models/purchase.model";
import { IBookRepository } from "../../repositories/interfaces/ibook.repository";
import { IPurchaseRepository } from "../../repositories/interfaces/ipurchase.repository";
import { IPurchaseService } from "../interfaces/ipurchase.service";
import counterModel from "../../models/counter.model";
import { generatePurchaseId } from "../../utils/generatedPurchaseId";
import mongoose from "mongoose";
import { IRevenueRepository } from "../../repositories/interfaces/irevenue.repository";

export class PurchaseService implements IPurchaseService {
  private purchaseRepo: IPurchaseRepository;
  private bookRepo: IBookRepository;
  private revenueRepo: IRevenueRepository;

  constructor(
    purchaseRepo: IPurchaseRepository,
    bookRepo: IBookRepository,
    revenueRepo: IRevenueRepository
  ) {
    this.purchaseRepo = purchaseRepo;
    this.bookRepo = bookRepo;
    this.revenueRepo = revenueRepo
  }

  async purchaseBook(
    userId: string,
    bookId: string,
    quantity: number
  ): Promise<IPurchase> {
    const book = await this.bookRepo.findById(bookId);
    if (!book) {
      throw new AppError(MESSAGES.BOOK.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const counter = await counterModel.findOneAndUpdate(
      { id: "purchaseId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const purchaseId = generatePurchaseId(counter.seq);
    const price = book.price * quantity;

    const newPurchase = await this.purchaseRepo.create({
      purchaseId,
      bookId: new mongoose.Types.ObjectId(bookId),
      userId: new mongoose.Types.ObjectId(userId),
      purchaseDate: new Date(),
      price,
      quantity,
    });

    await this.bookRepo.updateOne(
      { _id: new mongoose.Types.ObjectId(bookId) },
      { $inc: { sellCount: quantity } }
    );

    const share = price / book.authors.length;
    for (const authorId of book.authors) {
      await this.revenueRepo.create({
        authorId: new mongoose.Types.ObjectId(authorId),
        purchaseId: newPurchase._id as mongoose.Types.ObjectId,
        bookId: book._id as mongoose.Types.ObjectId,
        amount: share,
      });
    }

    return newPurchase;
  }

  async getUserPurchases(userId: string): Promise<IPurchase[]> {
    return await this.purchaseRepo.findByUserId(userId);
  }
}
