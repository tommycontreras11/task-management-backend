import { TaskEntity } from "../../database/entities/entity/task.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteTaskService(uuid: string) {
  const task = await TaskEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("deleteTaskService -> TaskEntity.findOne: ", e);
    return null;
  });

  if (!task)
    return Promise.reject({
      message: "Task not found",
      status: statusCode.NOT_FOUND,
    });

  await task.softRemove().catch((e) => {
    console.error("deleteTaskService -> TaskEntity.softRemove: ", e);
    return null;
  });

  return "Task deleted successfully";
}
