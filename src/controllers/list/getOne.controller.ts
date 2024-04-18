import { Request, Response } from "express";
import { getOneListService } from "../../services/list/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneListController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  getOneListService({ where: { uuid }, relations: { board: true } })
    .then((list) => {
      const data = {
        uuid: list.uuid,
        title: list.title,
        board: {
          uuid: list.board.uuid,
          title: list.board.title,
        },
      };

      return res.status(statusCode.OK).json(data);
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
