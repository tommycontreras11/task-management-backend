import { Request, Response } from "express";
import { updateUserService } from "../../services/user/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateUserController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string;

  updateUserService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
