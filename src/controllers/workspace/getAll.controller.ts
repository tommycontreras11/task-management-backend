import { Request, Response } from "express";
import { getAllWorkspaceService } from "../../services/workspace/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllWorkspaceController = async (_req: Request, res: Response) => {
    getAllWorkspaceService({
        cache: true,
        relations: {
            workspaceType: true,
            user: true
        }
    }).then((workspaces) => {
        const data = workspaces.map(workspace => ({
            uuid: workspace.uuid,
            name: workspace.name,
            description: workspace.description,
            type: workspace.workspaceType.type,
            user: {
                uuid: workspace.user.uuid,
                fullName: workspace.user.firstName + ' ' + workspace.user.lastName,
            }
        }))

        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ error: { message: e.message } })
    })
}