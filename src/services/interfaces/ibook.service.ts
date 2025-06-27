import { IBook } from "../../models/books.model";

export interface IBookService {
  createBook(data: Partial<IBook>, loggedInUserId: string): Promise<IBook>;
  getBooks(
    filters: { title?: string; minPrice?: number; maxPrice?: number },
    page: number,
    limit: number
  ): Promise<IBook[]>;
  getBookBySlug(slug: string): Promise<IBook>;
}