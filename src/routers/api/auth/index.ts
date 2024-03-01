import { Router } from "express";
import { signInController } from "../../../controllers/auth";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { SignInDTO } from "../../../dto/auth.dto";

const router = Router()

router.post('/signIn', validateDTO(SignInDTO), signInController)

export default router