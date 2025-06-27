import { NextFunction, Request, Response } from "express";
import { IBookService } from "../services/interfaces/ibook.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class BookController {
    private bookService : IBookService
    constructor(bookService: IBookService) {
        this.bookService = bookService
    }

    async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const loggedInUserId = req.user?.id
            if (!loggedInUserId) {
                 res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.USER.UNAUTHORIZED });
                 return
              }
              
              const book = await this.bookService.createBook(req.body, loggedInUserId)
              res.status(HTTP_STATUS.CREATED).json({message: MESSAGES.BOOK.CREATED, book})
        } catch (error) {
            next(error)
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
      
          const filters = {
            title: title as string | undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
          };
      
          const books = await this.bookService.getBooks(filters, Number(page), Number(limit));
      
          res.status(HTTP_STATUS.OK).json({ books });
        } catch (error) {
          next(error);
        }
      }
      
      async getBookBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const { slug } = req.params;
          const book = await this.bookService.getBookBySlug(slug);
          res.status(HTTP_STATUS.OK).json({ message: MESSAGES.BOOK.FOUND, book });
        } catch (error) {
          next(error);
        }
      }
}