import { Request, Response } from "express";
import { updateBoardService } from "../../services/board/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateBoardController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  updateBoardService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
