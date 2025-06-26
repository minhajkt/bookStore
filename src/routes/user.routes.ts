import express from 'express'
import { container } from '../config/dependency.container'
import { validateCreateUser, validateRequest } from '../middlewares/validation'

const router = express.Router()

const {userController} = container

router.post('/register', validateCreateUser, validateRequest, userController.createUser.bind(userController))

export default router;