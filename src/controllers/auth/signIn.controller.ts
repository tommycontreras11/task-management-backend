import { Request, Response } from "express";
import { signInService } from "../../services/auth/signIn.service";
import { statusCode } from "../../utils/statusCode";

export const signInController = async (req: Request, res: Response) => {
    signInService(req.body).then(data => {
        return res.status(statusCode.OK).json(data)
    }).catch(e => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}