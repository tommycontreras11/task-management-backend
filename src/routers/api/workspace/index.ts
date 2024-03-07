import { UuidDTO } from "../../../common/uuid.dto";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceController,
  getOneWorkspaceController,
  updateWorkspaceController,
} from "../../../controllers/workspace";
import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateWorkspaceDTO } from "../../../dto/workspace.dto";

const router = Router();

router.get("/", getAllWorkspaceController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneWorkspaceController);
router.post(
  "/",
  validateDTO(CreateWorkspaceDTO, "body"),
  createWorkspaceController
);
router.patch(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  updateWorkspaceController
);
router.delete(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  deleteWorkspaceController
);

export default router;
