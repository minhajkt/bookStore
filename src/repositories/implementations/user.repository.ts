import User, { IUser } from "../../models/user.model";
import { BaseRepository } from "../base/base.repository";
import { IUserRepository } from "../interfaces/iuser.repository";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User)
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return this.findOne({email})
    }
}