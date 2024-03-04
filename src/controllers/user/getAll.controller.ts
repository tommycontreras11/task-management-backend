import { Request, Response } from "express";
import { getAllUserService } from "../../services/user/getAll.service";
import { statusCode } from "../../utils/statusCode"

export const getAllUserController = async (_req: Request, res: Response) => {
    getAllUserService({
        cache: true
    }).then(users => {
        const data = users.map(user => ({
            uuid: user.uuid,
            fullName: user.firstName + ' ' + user.lastName,
            email: user.email,
            userName: user.userInfo.userName
        }))

        return res.status(statusCode.OK).json(data)
    }).catch(e => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}