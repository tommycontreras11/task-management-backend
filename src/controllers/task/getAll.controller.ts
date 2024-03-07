import { Request, Response } from "express";
import { getAllTaskService } from "../../services/task/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllTaskController = async (_req: Request, res: Response) => {
    getAllTaskService({
        order: {
            dueDate: 'ASC'
        },
        cache: true,
    }).then((tasks) => {
        const data = tasks.map(task => ({
            uuid: task.uuid,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
        }))

        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}