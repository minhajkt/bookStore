import { Types } from "mongoose";
import User, { IUser } from "../../models/user.model";
import { BaseRepository } from "../base/base.repository";
import { IUserRepository } from "../interfaces/iuser.repository";
import userModel from "../../models/user.model";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User)
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return this.findOne({email})
    }

    async findAuthorsByIds(ids: Types.ObjectId[]): Promise<IUser[]> {
        return userModel.find({ _id: { $in: ids }, role: 'author' });
    }
}