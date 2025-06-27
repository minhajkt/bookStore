import { HTTP_STATUS } from "../../constants/httpStatus";
import { MESSAGES } from "../../constants/messages";
import { AppError } from "../../errors/AppError";
import { IPurchase } from "../../models/purchase.model";
import { IBookRepository } from "../../repositories/interfaces/ibook.repository";
import { IPurchaseRepository } from "../../repositories/interfaces/ipurchase.repository";
import { IPurchaseService } from "../interfaces/purchase.service";
import counterModel from "../../models/counter.model";
import { generatePurchaseId } from "../../utils/generatedPurchaseId";
import mongoose from "mongoose";


export class PurchaseService implements IPurchaseService {
  private purchaseRepo: IPurchaseRepository;
  private bookRepo: IBookRepository;

  constructor(purchaseRepo: IPurchaseRepository, bookRepo: IBookRepository) {
    this.purchaseRepo = purchaseRepo;
    this.bookRepo = bookRepo;
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

    const purchaseId = generatePurchaseId(counter.seq)
    const price = book.price * quantity;

    const newPurchase = await this.purchaseRepo.create({
      purchaseId,
      bookId: new mongoose.Types.ObjectId(bookId),
      userId: new mongoose.Types.ObjectId(userId),
      purchaseDate: new Date(),
      price,
      quantity,
    });

    return newPurchase;
  }
}