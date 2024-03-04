import { Request, Response } from "express";
import { deleteTaskService } from "../../services/task/delete.service";
import { statusCode } from "../../utils/statusCode";

export const deleteTaskController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  deleteTaskService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message })
    );
};
