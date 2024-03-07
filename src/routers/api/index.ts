import { Router } from "express";
import userRoutes from "./user"
import authRoutes from './auth'
import taskRoutes from './task'
import workspaceRoutes from './workspace'
import { authMiddleware } from "../../middlewares/auth/auth.middleware";
import { unless } from "../../utils/unless.util";

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', unless(
    [
        { path: '/', method: 'POST' }
    ], authMiddleware), userRoutes)
router.use('/workspaces', authMiddleware, workspaceRoutes)
router.use('/tasks', authMiddleware, taskRoutes)

export default router