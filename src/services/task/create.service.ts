import { BoardEntity } from "../../database/entities/entity/board.entity";
import {
  PriorityTaskStatus,
  TaskEntity,
} from "../../database/entities/entity/task.entity";
import { CreateTaskDTO } from "../../dto/task.dto";
import { statusCode } from "../../utils/statusCode";

export async function createTaskService({ boardUUID, priority, ...payload }: CreateTaskDTO) {
  const board = await BoardEntity.findOne({
    where: {
      uuid: boardUUID,
    },
  }).catch((e) => {
    console.error("createTaskService -> BoardEntity.findOne: ", e);
    return null;
  });

  if (!board)
    return Promise.reject({
      message: "Board not found",
      status: statusCode.NOT_FOUND,
    });

  const task = await TaskEntity.create({
    board,
    priority: priority ? priority : PriorityTaskStatus.LOW,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createTaskService -> TaskEntity.create: ", e);
      return null;
    });

  if (!task)
    return Promise.reject({
      message: "Task not created",
      status: statusCode.BAD_REQUEST,
    });

  return "Task created successfully";
}
