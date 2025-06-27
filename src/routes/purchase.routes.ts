import express from 'express'
import { container } from '../config/dependency.container'
import { authenticateJWT } from '../middlewares/authenticate'
import { validateCreateBook, validatePurchase, validateRequest } from '../middlewares/validation'

const router = express.Router()

const {purchaseController} = container

router.post('/buy', authenticateJWT, validatePurchase, validateRequest, purchaseController.purchaseBook.bind(purchaseController))

export default router;