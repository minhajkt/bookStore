import { IUser } from "../../models/user.model";
import { BaseRepository } from "../base/base.repository";

export interface IUserRepository extends BaseRepository<IUser> {
    findByEmail(email: string) : Promise<IUser | null>
}