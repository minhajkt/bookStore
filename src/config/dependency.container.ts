
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/implementations/user.repository";
import { UserService } from "../services/implementations/user.service";

export const container = setupContainer();

export function setupContainer() {
  const userRepo = new UserRepository();
  const userService = new UserService(userRepo);
  const userController = new UserController(userService);

  return {
    userController,
  };
}
