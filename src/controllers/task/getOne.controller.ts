import { Request, Response } from "express";
import { getOneTaskService } from "../../services/task/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneTaskController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid as string

    getOneTaskService({
        where: {
            uuid
        }
    }).then((task) => {
        const data = {
            uuid: task.uuid,
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate
        }

        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ error: { message: e.message } })
    })
}