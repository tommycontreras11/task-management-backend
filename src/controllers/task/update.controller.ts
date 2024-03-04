import { Request, Response } from "express";
import { updateTaskService } from "../../services/task/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateTaskController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;
  
  updateTaskService(req.body, uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message })
    );
};
