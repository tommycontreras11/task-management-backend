import { Request, Response } from "express";
import { getOneBoardService } from "../../services/board/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getListByBoardController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  getOneBoardService({
    where: { uuid },
    relations: {
      lists: true
    },
  })
    .then((board) => {
      const data = {
        uuid: board.uuid,
        title: board.title,
        lists: board.lists.map((list) => ({
          uuid: list.uuid,
          title: list.title
        })),
      };

      return res.status(statusCode.OK).json(data);
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
