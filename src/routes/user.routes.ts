import express from 'express'
import { container } from '../config/dependency.container'
import { validateCreateUser, validateLoginUser, validateRequest } from '../middlewares/validation'

const router = express.Router()

const {userController} = container

router.post('/register', validateCreateUser, validateRequest, userController.createUser.bind(userController))
router.post('/login', validateLoginUser, validateRequest, userController.login.bind(userController))

export default router;