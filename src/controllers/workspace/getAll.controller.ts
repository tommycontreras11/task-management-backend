import { Request, Response } from "express";
import { getAllWorkspaceService } from "../../services/workspace/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllWorkspaceController = async (_req: Request, res: Response) => {
    getAllWorkspaceService({
        cache: true,
        relations: {
            workspaceType: true
        }
    }).then((workspaces) => {
        const data = workspaces.map(workspace => ({
            uuid: workspace.uuid,
            name: workspace.name,
            description: workspace.description,
            type: workspace.workspaceType.type
        }))

        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}