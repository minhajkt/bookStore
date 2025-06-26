import { MESSAGES } from "../../constants/messages";
import { IUser } from "../../models/user.model";
import { IUserRepository } from "../../repositories/interfaces/iuser.repository";
import { IUserService } from "../interfaces/iuser.service";
import bcrypt from 'bcryptjs'

export class UserService implements IUserService {
    private userRepository : IUserRepository

    constructor(userRepository : IUserRepository) {
        this.userRepository = userRepository
    }
    async createUser(data: Partial<IUser>): Promise<IUser> {
            const {email, password} = data
            const existingEmail = await this.userRepository.findByEmail(email!) 
            if(existingEmail) {
                throw new Error(MESSAGES.USER.EXISTS)
            }
            const hashedPassword = await bcrypt.hash(password!, 10);
            return this.userRepository.create({...data, password : hashedPassword})
    }
}

