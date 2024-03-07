import { UuidDTO } from "../../../common/uuid.dto";
import {
  createBoardController,
  deleteBoardController,
  getAllBoardController,
  getOneBoardController,
  updateBoardController,
} from "../../../controllers/board";
import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateBoardDTO, UpdateBoardDTO } from "../../../dto/board.dto";

const router = Router();

router.get("/", getAllBoardController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneBoardController);
router.post("/", validateDTO(CreateBoardDTO, "body"), createBoardController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateBoardDTO, "body")],
  updateBoardController
);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteBoardController);

export default router;
