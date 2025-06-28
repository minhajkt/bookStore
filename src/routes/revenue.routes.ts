import express from 'express'
import { container } from '../config/dependency.container';
import { authenticateJWT } from '../middlewares/authenticate';
import { authorizeRoles } from '../middlewares/authorizeRole';

const router = express.Router()

const {revenueController} = container

router.get("/",authenticateJWT,authorizeRoles("author"),revenueController.getAuthorRevenue.bind(revenueController));
router.get("/total",authenticateJWT,authorizeRoles("author"),revenueController.getAuthorTotalRevenue.bind(revenueController));

export default router;