import { TaskEntity } from "../../database/entities/entity/task.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getAllTaskService(options?: FindManyOptions<TaskEntity>) {
  const tasks = await TaskEntity.find(options).catch((e) => {
    console.error("getAllTaskService -> TaskEntity.find: ", e);
    return null;
  });

  if (!tasks)
    return Promise.reject({
      message: "Tasks not found",
      status: statusCode.NOT_FOUND,
    });

  return tasks;
}
