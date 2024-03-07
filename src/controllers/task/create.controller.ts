import { Request, Response } from "express";
import { createTaskService } from "../../services/task/create.service";
import { statusCode } from "../../utils/statusCode";

export const createTaskController = async (req: Request, res: Response) => {
  createTaskService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message })
    );
};
