import { TaskEntity } from "../../database/entities/entity/task.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getOneTaskService(options: FindOneOptions<TaskEntity>) {
  const task = await TaskEntity.findOne(options).catch((e) => {
    console.error("getOneTaskService -> TaskEntity.findOne: ", e);
    return null;
  });

  if (!task)
    return Promise.reject({
      message: "Task not found",
      status: statusCode.NOT_FOUND,
    });

  return task;
}
