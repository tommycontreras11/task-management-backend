import { Router } from "express";
import userRoutes from "./user"
import authRoutes from './auth'
import taskRoutes from './task'
import workspaceRoutes from './workspace'
import boardRoutes from './board'
import meRoutes from './me'
import listRoutes from './list'
import { authMiddleware } from "../../middlewares/auth/auth.middleware";
import { unless } from "../../utils/unless.util";

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', unless(
    [
        { path: '/', method: 'POST' }
    ], authMiddleware), userRoutes)
router.use('/workspaces', authMiddleware, workspaceRoutes)
router.use('/boards', authMiddleware, boardRoutes)
router.use('/tasks', authMiddleware, taskRoutes)
router.use('/me', authMiddleware, meRoutes)
router.use('/lists', authMiddleware, listRoutes)

export default router