import { NextFunction, Request, Response } from "express";
import { IUserService } from "../services/interfaces/iuser.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class UserController {
    private userService : IUserService
    constructor(userService : IUserService) {
        this.userService = userService
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body)
            res.status(HTTP_STATUS.CREATED).json({message: MESSAGES.USER.CREATED, user})
        } catch (error) {
            next(error)
        }
    }
    
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {user, accessToken, refreshToken} = await this.userService.login(req.body)
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000, 
            });

            res.status(HTTP_STATUS.OK).json({message: MESSAGES.USER.LOGIN_SUCCESS, accessToken, user})
        } catch (error) {
            next(error)
        }
    }
}
