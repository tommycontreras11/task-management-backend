import { Request, Response } from "express";
import { updateWorkspaceService } from "../../services/workspace/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateWorkspaceController = async (
  req: Request,
  res: Response
) => {
  const uuid = req.params.uuid as string;

  updateWorkspaceService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    });
};
