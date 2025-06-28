
import { BookController } from "../controllers/book.controller";
import { PurchaseController } from "../controllers/purchase.controller";
import { RevenueController } from "../controllers/revenue.controller";
import { UserController } from "../controllers/user.controller";
import { BookRepository } from "../repositories/implementations/book.repository";
import { PurchaseRepository } from "../repositories/implementations/purchase.repository";
import { RevenueRepository } from "../repositories/implementations/revenue.repository";
import { UserRepository } from "../repositories/implementations/user.repository";
import { BookService } from "../services/implementations/book.service";
import { PurchaseService } from "../services/implementations/purchase.service";
import { RevenueService } from "../services/implementations/revenue.service";
import { UserService } from "../services/implementations/user.service";

export const container = setupContainer();

export function setupContainer() {
  const userRepo = new UserRepository();
  const userService = new UserService(userRepo);
  const userController = new UserController(userService);

  const bookRepo = new BookRepository()
  const bookService = new BookService(bookRepo, userRepo)
  const bookController = new BookController(bookService)

  const revenueRepo = new RevenueRepository()
  const revenueService = new RevenueService(revenueRepo)
  const revenueController = new RevenueController(revenueService)
  
  const purchaseRepo = new PurchaseRepository()
  const purchaseService =  new PurchaseService(purchaseRepo, bookRepo, revenueRepo)
  const purchaseController = new PurchaseController(purchaseService)


  return {
    userController,
    bookController,
    purchaseController,
    revenueController
  };
}
