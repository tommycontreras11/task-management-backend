import { Router } from "express";
import multer from "multer";
import { UuidDTO } from "../../../common/uuid.dto";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  getOneTaskController,
  updateTaskController,
  uploadFileController,
} from "../../../controllers/task";
import { CreateTaskDTO, UpdateTaskDTO } from "../../../dto/task.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();
const taskMulter = multer()

router.get("/", getAllTaskController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneTaskController);
router.post("/", validateDTO(CreateTaskDTO, "body"), createTaskController);
router.post("/:uuid/files", [
  taskMulter.array("files"),
  validateDTO(UuidDTO, "params")
], uploadFileController);
router.patch(
  "/:uuid",
  [validateDTO(UpdateTaskDTO, "body"), validateDTO(UuidDTO, "params")],
  updateTaskController
);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteTaskController);

export default router;
