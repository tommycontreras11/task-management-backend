import { TaskEntity } from "../../database/entities/entity/task.entity";
import { UpdateTaskDTO } from "../../dto/task.dto";
import { statusCode } from "../../utils/statusCode";

export async function updateTaskService({ ...payload }: UpdateTaskDTO, uuid: string) {
  const foundTask = await TaskEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("updateTaskService -> TaskEntity.findOne: ", e);
    return null;
  });

  if (!foundTask)
    return Promise.reject({
      message: "Task not found",
      status: statusCode.NOT_FOUND,
    });

  await TaskEntity.update(
    { id: foundTask.id },
    {
      ...payload,
    }
  ).catch((e) => {
    console.error("updateTaskService -> TaskEntity.update: ", e);
    return null;
  });

  return "Task updated successfully";
}
