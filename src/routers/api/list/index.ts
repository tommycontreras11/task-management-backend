import { UuidDTO } from "../../../common/uuid.dto";
import {
  createListController,
  deleteListController,
  getAllListController,
  getOneListController,
  getTaskByListController,
  updateListController,
} from "../../../controllers/list";
import { CreateListDTO, UpdateListDTO } from "../../../dto/list.dto";
import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.get("/", getAllListController);
router.get("/:uuid/tasks", [validateDTO(UuidDTO, "params")], getTaskByListController);
router.get("/:uuid", [validateDTO(UuidDTO, "params")], getOneListController);
router.post("/", validateDTO(CreateListDTO), createListController);
router.patch(
  "/:uuid",
  [validateDTO(UpdateListDTO), validateDTO(UuidDTO, "params")],
  updateListController
);
router.delete("/:uuid", [validateDTO(UuidDTO, "params")], deleteListController);

export default router;
