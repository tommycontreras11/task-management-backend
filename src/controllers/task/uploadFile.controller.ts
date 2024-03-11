import { Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { uploadFileService } from "../../services/task/uploadFile.service";

export const uploadFileController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string

  uploadFileService(uuid, req.files)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: e.message })
    );
};
