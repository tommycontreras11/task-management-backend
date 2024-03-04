import { PriorityTaskStatus, TaskEntity } from "../../database/entities/entity/task.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { CreateTaskDTO } from "../../dto/task.dto";
import { statusCode } from "../../utils/statusCode";

export async function createTaskService({ userUUID, priority, ...payload }: CreateTaskDTO) {
    const user = await UserEntity.findOne({
        where: {
            uuid: userUUID
        }
    }).catch(e => {
        console.error('createTaskService -> UserEntity.findOne: ', e)
        return null
    })

    if(!user) return Promise.reject({ message: 'User not found', status: statusCode.NOT_FOUND })

    const task = await TaskEntity.create({
        priority: priority ? priority : PriorityTaskStatus.LOW,
        ...payload,
        user
    }).save().catch(e => {
        console.error('createTaskService -> TaskEntity.create: ', e)
        return null
    })

    if(!task) return Promise.reject({ message: 'Task not created', status: statusCode.BAD_REQUEST })

    return "Task created successfully"
}