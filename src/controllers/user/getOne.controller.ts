import { Request, Response } from "express";
import { getOneUserService } from "../../services/user/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneUserController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid as string
    
    getOneUserService({
        where: {
            uuid
        },
        relations: {
            userInfo: true
        }
    }).then((user) => {
        const data = {
            uuid: user.uuid,
            fullName: user.firstName + ' ' + user.lastName,
            email: user.email,
            userName: user.userInfo.userName,
            gender: user.userInfo.gender,
            birthdate: user.userInfo.birthdate
        }
        return res.status(statusCode.OK).json(data)
    }).catch((e) => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ error: { message: e.message } })
    })
}