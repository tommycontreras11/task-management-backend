import { Router } from "express";
import { signInController, signOutController } from "../../../controllers/auth";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { SignInDTO } from "../../../dto/auth.dto";
const router = Router()

router.post('/signIn', validateDTO(SignInDTO), signInController)
router.post('/signOut', signOutController)

export default router