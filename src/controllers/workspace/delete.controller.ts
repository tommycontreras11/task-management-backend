import { Request, Response } from "express";
import { deleteWorkspaceService } from "../../services/workspace/delete.service";
import { statusCode } from "../../utils/statusCode";

export const deleteWorkspaceController = async (
  req: Request,
  res: Response
) => {
  const uuid = req.params.uuid as string;

  deleteWorkspaceService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
