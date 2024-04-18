import { Request, Response } from "express";
import { createWorkspaceService } from "../../services/workspace/create.service";
import { statusCode } from "../../utils/statusCode";

export const createWorkspaceController = async (
  req: Request,
  res: Response
) => {
  createWorkspaceService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    )
};
