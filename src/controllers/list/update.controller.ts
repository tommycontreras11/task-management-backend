import { Request, Response } from "express";
import { updateListService } from "../../services/list/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateListController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string

  updateListService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
