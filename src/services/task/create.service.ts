import { ListEntity } from "../../database/entities/entity/list.entity";
import {
  PriorityTaskStatus,
  TaskEntity,
} from "../../database/entities/entity/task.entity";
import { CreateTaskDTO } from "../../dto/task.dto";
import { statusCode } from "../../utils/statusCode";

export async function createTaskService({ listUUID, priority, ...payload }: CreateTaskDTO) {
  const list = await ListEntity.findOne({
    where: {
      uuid: listUUID,
    },
  }).catch((e) => {
    console.error("createTaskService -> ListEntity.findOne: ", e);
    return null;
  });

  if (!list)
    return Promise.reject({
      message: "List not found",
      status: statusCode.NOT_FOUND,
    });

  const task = await TaskEntity.create({
    list,
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
