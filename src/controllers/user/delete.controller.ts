import { Request, Response } from "express"
import { deleteUserService } from "../../services/user/delete.service"
import { statusCode } from "../../utils/statusCode"

export const deleteUserController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid

    deleteUserService(uuid).then(data => {
        return res.json({ data })
    }).catch(e => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}