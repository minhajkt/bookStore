import express from 'express'
import { container } from '../config/dependency.container'
import { authenticateJWT } from '../middlewares/authenticate'
import { validateCreateBook, validateRequest } from '../middlewares/validation'
import { authorizeRoles } from '../middlewares/authorizeRole'

const router = express.Router()

const {bookController} = container

router.post('/', authenticateJWT, authorizeRoles('author'),validateCreateBook, validateRequest, bookController.createBook.bind(bookController))
router.get("/", bookController.getBooks.bind(bookController));
router.get("/:slug", bookController.getBookBySlug.bind(bookController));

export default router;