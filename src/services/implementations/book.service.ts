import mongoose from "mongoose";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { MESSAGES } from "../../constants/messages";
import { IBook } from "../../models/books.model";
import counterModel from "../../models/counter.model";
import { IBookRepository } from "../../repositories/interfaces/ibook.repository";
import { IBookService} from "../interfaces/ibook.service";
import { IUserRepository } from "../../repositories/interfaces/iuser.repository";
import { generateUniqueSlug } from "../../utils/slug";
import { AppError } from "../../errors/AppError";

export class BookService implements IBookService {
  private bookRepository: IBookRepository;
  private userRepository: IUserRepository;
  constructor(
    bookRepository: IBookRepository,
    userRepository: IUserRepository
  ) {
    this.bookRepository = bookRepository;
    this.userRepository = userRepository;
  }

  async createBook(
    data: Partial<IBook>,
    loggedInUserId: string
  ): Promise<IBook> {
    const { title, description, price } = data;
    let { authors } = data;
    if (!title)
      throw new AppError(MESSAGES.BOOK.TITLE_REQUIRED, HTTP_STATUS.BAD_REQUEST);
    if (!description)
      throw new AppError(
        MESSAGES.BOOK.DESCRIPTION_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    if (!price || price < 100 || price > 1000)
      throw new AppError(MESSAGES.BOOK.PRORER_PRICE, HTTP_STATUS.BAD_REQUEST);

    if (!authors || authors.length === 0) {
      authors = [new mongoose.Types.ObjectId(loggedInUserId)];
    } else {
      authors = authors.map((id) => new mongoose.Types.ObjectId(id));
      const loggedInObjectId = new mongoose.Types.ObjectId(loggedInUserId);
      if (!authors.some((id) => id.equals(loggedInObjectId))) {
        authors.push(loggedInObjectId);
      }
      const authorUsers = await this.userRepository.findAuthorsByIds(authors);
      if (authorUsers.length !== authors.length) {
        throw new AppError(
          "One or more authors are invalid users",
          HTTP_STATUS.BAD_REQUEST
        );
      }
    }

    const existingTitle = await this.bookRepository.findByTitle(title);
    if (existingTitle)
      throw new AppError(MESSAGES.BOOK.TITLE_EXISTS, HTTP_STATUS.CONFLICT);

    const slug = await generateUniqueSlug(title, this.bookRepository);

    const counter = await counterModel.findOneAndUpdate(
      { id: "bookId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const bookId = `book-${counter.seq}`;

    const newBook = await this.bookRepository.create({
      ...data,
      authors,
      slug,
      bookId,
    });
    return newBook;
  }

  async getBooks(
    filters: { title?: string; minPrice?: number; maxPrice?: number },
    page: number,
    limit: number
  ): Promise<IBook[]> {
    const query: any = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }

    return this.bookRepository
      .findAll(query)
      .then((books) => books.slice((page - 1) * limit, page * limit));
  }

  async getBookBySlug(slug: string): Promise<IBook> {
    const book = await this.bookRepository.findBySlug(slug);
    if (!book) {
      throw new AppError(MESSAGES.BOOK.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return book;
  }
}
