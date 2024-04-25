import { Request, Response } from "express";
import { getOneListService } from "../../services/list/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getTaskByListController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  getOneListService({
    where: { uuid },
    relations: {
      tasks: true,
    },
  })
    .then((list) => {
      const data = {
        uuid: list.uuid,
        title: list.title,
        tasks: list.tasks.map((task) => ({
          uuid: task.uuid,
          title: task.title,
          description: task.description,
        })),
      };

      return res.status(statusCode.OK).json(data);
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
