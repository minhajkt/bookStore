import express from 'express'
import { container } from '../config/dependency.container'
import { authenticateJWT } from '../middlewares/authenticate'
import { validateCreateBook, validatePurchase, validateRequest } from '../middlewares/validation'
import { authorizeRoles } from '../middlewares/authorizeRole'

const router = express.Router()

const {purchaseController} = container

router.post('/', authenticateJWT, authorizeRoles('buyer') ,validatePurchase, validateRequest, purchaseController.purchaseBook.bind(purchaseController))
router.get('/',authenticateJWT,authorizeRoles('buyer'),purchaseController.getUserPurchases.bind(purchaseController)
  );

export default router;