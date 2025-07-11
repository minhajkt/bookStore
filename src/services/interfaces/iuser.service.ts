import { IUser } from "../../models/user.model";

export interface IUserService {
  createUser(data: Partial<IUser>): Promise<IUser>;
  login(
    data: Partial<IUser>
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }>;
}
