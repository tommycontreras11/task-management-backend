import { Request, Response } from "express";
import { createListService } from "../../services/list/create.service";
import { statusCode } from "../../utils/statusCode";

export const createListController = async (req: Request, res: Response) => {
  createListService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
