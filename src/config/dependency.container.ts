
import { BookController } from "../controllers/book.controller";
import { UserController } from "../controllers/user.controller";
import { BookRepository } from "../repositories/implementations/book.repository";
import { UserRepository } from "../repositories/implementations/user.repository";
import { BookService } from "../services/implementations/book.service";
import { UserService } from "../services/implementations/user.service";

export const container = setupContainer();

export function setupContainer() {
  const userRepo = new UserRepository();
  const userService = new UserService(userRepo);
  const userController = new UserController(userService);

  const bookRepo = new BookRepository()
  const bookService = new BookService(bookRepo, userRepo)
  const bookController = new BookController(bookService)

  return {
    userController,
    bookController
  };
}
