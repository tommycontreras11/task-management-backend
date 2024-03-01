import { Router } from "express";
import userRoutes from "./user"
import authRoutes from './auth'
import { authMiddleware } from "../../middlewares/auth/auth.middleware";
import { unless } from "../../utils/unless.util";

const router = Router()

router.use('/users', unless(
    [
        { path: '/', method: 'POST' }
    ], authMiddleware), userRoutes)

router.use('/auth', authRoutes)

export default router