import { Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { getOneUserService } from "../../services/user/getOne.service";

export const meController = async (req: Request, res: Response) => {
    getOneUserService({
        where: {
            uuid: req.user.userId
        },
        relations: {
            userInfo: true
        }
    }).then(user => {
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
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}