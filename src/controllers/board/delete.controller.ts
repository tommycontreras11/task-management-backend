import { Request, Response } from "express";
import { deleteBoardService } from "../../services/board/delete.service";
import { statusCode } from "../../utils/statusCode";

export const deleteBoardController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  deleteBoardService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    });
};
