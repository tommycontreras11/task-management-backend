import { Request, Response } from "express";
import { signInService } from "../../services/auth/signIn.service";
import { statusCode } from "../../utils/statusCode";
import jsonwebtoken from 'jsonwebtoken'

export const signInController = async (req: Request, res: Response) => {
    signInService(req.body).then(data => {
        const token = jsonwebtoken.sign({ userId: data.uuid }, process.env.ACCESS_TOKEN_SECRET!)
    
        return res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        }).status(statusCode.OK).json({ token })
    }).catch(e => {
        return res.status(e.status ?? statusCode.INTERNAL_SERVER_ERROR).json({ message: e.message })
    })
}