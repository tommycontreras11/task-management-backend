import { Request, Response } from "express";
import { getAllBoardService } from "../../services/board/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllBoardController = async (_req: Request, res: Response) => {
  getAllBoardService({})
    .then((boards) => {
      const data = boards.map((board) => ({
        uuid: board.uuid,
        title: board.title,
      }));

      return res.status(statusCode.OK).json(data);
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    });
};
