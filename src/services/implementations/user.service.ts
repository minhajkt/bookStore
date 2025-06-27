import { HTTP_STATUS } from "../../constants/httpStatus";
import { MESSAGES } from "../../constants/messages";
import { AppError } from "../../errors/AppError";
import { IUser } from "../../models/user.model";
import { IUserRepository } from "../../repositories/interfaces/iuser.repository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IUserService } from "../interfaces/iuser.service";
import bcrypt from "bcryptjs";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async createUser(data: Partial<IUser>): Promise<IUser> {
    const { email, password, role } = data;
    if (!email) {
      throw new AppError(MESSAGES.USER.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
    }
    if (!password) {
      throw new AppError(MESSAGES.USER.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
    }
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new AppError(MESSAGES.USER.EXISTS, HTTP_STATUS.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password!, 10);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async login(data: Partial<IUser>): Promise<{user:IUser, accessToken: string, refreshToken: string}> {
    const { email, password } = data;
    if (!email) throw new AppError(MESSAGES.USER.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
    if (!password) throw new AppError(MESSAGES.USER.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.CONFLICT);

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) throw new AppError(MESSAGES.USER.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);

    const payload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {user, accessToken, refreshToken}
  }
}
