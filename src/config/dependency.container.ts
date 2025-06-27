
import { BookController } from "../controllers/book.controller";
import { PurchaseController } from "../controllers/purchase.controller";
import { UserController } from "../controllers/user.controller";
import { BookRepository } from "../repositories/implementations/book.repository";
import { PurchaseRepository } from "../repositories/implementations/purchase.repository";
import { UserRepository } from "../repositories/implementations/user.repository";
import { BookService } from "../services/implementations/book.service";
import { PurchaseService } from "../services/implementations/purchase.service";
import { UserService } from "../services/implementations/user.service";

export const container = setupContainer();

export function setupContainer() {
  const userRepo = new UserRepository();
  const userService = new UserService(userRepo);
  const userController = new UserController(userService);

  const bookRepo = new BookRepository()
  const bookService = new BookService(bookRepo, userRepo)
  const bookController = new BookController(bookService)

  const purchaseRepo = new PurchaseRepository()
  const purchaseService =  new PurchaseService(purchaseRepo, bookRepo)
  const purchaseController = new PurchaseController(purchaseService)

  return {
    userController,
    bookController,
    purchaseController
  };
}
