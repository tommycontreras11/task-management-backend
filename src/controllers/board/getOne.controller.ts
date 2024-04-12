import { Request, Response } from "express";
import { getOneBoardService } from "../../services/board/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneBoardController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid as string
    
    getOneBoardService({
        where: {
            uuid
        },
        relations: {
            workspace: {
                workspaceType: true,
                user: true,
            },
            users: true
        }
    }).then((board) => {
        const data = {
            uuid: board.uuid,
            title: board.title,
            workspaces: {
                uuid: board.workspace.uuid,
                name: board.workspace.name,
                description: board.workspace.description,
                type: board.workspace.workspaceType.type,
                owner: {
                    uuid: board.workspace.user.uuid,
                    fullName: board.workspace.user.firstName + ' ' + board.workspace.user.lastName,
                    email: board.workspace.user.email
                }
            },
            users: board.users.map((user) => ({
                uuid: user.uuid,
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email
            }))
        }

        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}