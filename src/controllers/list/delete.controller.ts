import { Request, Response } from "express";
import { deleteListService } from "../../services/list/delete.service";
import { statusCode } from "../../utils/statusCode";

export const deleteListController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string

  deleteListService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
