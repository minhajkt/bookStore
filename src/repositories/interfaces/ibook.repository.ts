import mongoose, { ObjectId } from "mongoose";
import { IBook } from "../../models/books.model";
import { IBaseRepository } from "../base/base.repository";

export interface IBookRepository extends IBaseRepository<IBook> {
  findByBookId(bookId: string): Promise<IBook | null>;
  findByTitle(title: string): Promise<IBook | null>;
  findBySlug(slug: string): Promise<IBook | null>;
}
