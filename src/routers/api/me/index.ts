import { meController } from "../../../controllers/me/me.controller";
import { Router } from "express";

const router = Router()

router.get('/', meController)

export default router