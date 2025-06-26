import { IUser } from "../../models/user.model";

export interface IUserService {
  createUser(data: Partial<IUser>): Promise<IUser>;
}
