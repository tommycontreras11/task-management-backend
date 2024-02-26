import { Router } from "express";
import rootRouter from './root'
import apiRouter from './api'

const router = Router();

router.use('/api', apiRouter)
router.use('/', rootRouter)

export default router