import { Router } from "express";
import { UuidDTO } from "../../../common/uuid.dto";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceController,
  getOneWorkspaceController,
  updateWorkspaceController,
} from "../../../controllers/workspace";
import { CreateWorkspaceDTO, UpdateWorkspaceDTO } from "../../../dto/workspace.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

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
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateWorkspaceDTO, "body")],
  updateWorkspaceController
);
router.delete(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  deleteWorkspaceController
);

export default router;
