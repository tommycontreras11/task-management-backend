import { Request, Response } from "express";
import { createBoardService } from "../../services/board/create.service";
import { statusCode } from "../../utils/statusCode";

export const createBoardController = async (req: Request, res: Response) => {
  createBoardService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
