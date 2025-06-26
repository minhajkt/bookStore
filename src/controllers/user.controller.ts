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
}
