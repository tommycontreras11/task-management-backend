import { Request, Response } from "express";
import { getOneUserService } from "../../services/user/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneUserController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid as string
    
    getOneUserService({
        where: {
            uuid
        }
    }).then(user => {
        return res.json({ user })
    }).catch(e => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}