import { Router } from "express";
import { getAllUserController } from "../../../controllers/user/getAll.controller";

const router = Router()

router.get('/', getAllUserController)

export default router