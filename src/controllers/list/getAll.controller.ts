import { Request, Response } from "express";
import { getAllListService } from "../../services/list/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllListController = (_req: Request, res: Response) => {
  getAllListService({})
    .then((lists) => {
      const data = lists.map((list) => ({
        uuid: list.uuid,
        title: list.title,
      }));

      return res.status(statusCode.OK).json(data);
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
