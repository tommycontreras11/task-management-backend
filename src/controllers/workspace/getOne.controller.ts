import { Request, Response } from "express";
import { getOneWorkspaceService } from "../../services/workspace/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneWorkspaceController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid as string
    
    getOneWorkspaceService({
        where: {
            uuid
        },
        relations: {
            workspaceType: true,
            user: {
                userInfo: true
            }
        }
    }).then((workspace) => {
        const data = {
            uuid: workspace.uuid,
            name: workspace.name,
            description: workspace.description,
            type: workspace.workspaceType.type,
            user: {
                fullName: workspace.user.firstName + ' ' + workspace.user.lastName,
                email: workspace.user.email,
                birthdate: workspace.user.userInfo.birthdate,
                gender: workspace.user.userInfo.gender
            }
        }

        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}