import { UuidDTO } from "../../../common/uuid.dto";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  getOneTaskController,
  updateTaskController,
} from "../../../controllers/task";
import { CreateTaskDTO, UpdateTaskDTO } from "../../../dto/task.dto";
import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.get("/", getAllTaskController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneTaskController);
router.post("/", validateDTO(CreateTaskDTO), createTaskController);
router.patch(
  "/:uuid",
  [validateDTO(UpdateTaskDTO, "body"), validateDTO(UuidDTO, "params")],
  updateTaskController
);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteTaskController);

export default router;
