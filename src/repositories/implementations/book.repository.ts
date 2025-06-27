import booksModel, { IBook } from "../../models/books.model";
import { BaseRepository } from "../base/base.repository";
import { IBookRepository } from "../interfaces/ibook.repository";
import BookModel from "../../models/books.model";
import { FilterQuery } from "mongoose";

export class BookRepository extends BaseRepository<IBook> implements IBookRepository {
  constructor() {
    super(BookModel);
  }

  async findById(id: string): Promise<IBook | null> {
    return this.findById(id);
  }

  async findAll(filter: FilterQuery<IBook> = {}): Promise<IBook[]> {
    return BookModel.find(filter);
  }

  async findByTitle(title: string): Promise<IBook | null> {
    return this.findOne({ title });
  }

  async findByBookId(bookId: string): Promise<IBook | null> {
    return this.findOne({ bookId });
  }

  async findBySlug(slug: string): Promise<IBook | null> {
    return BookModel.findOne({ slug }).populate("authors", "name -_id");
  }
}
