import jsonwebtoken from 'jsonwebtoken'
import { statusCode } from '../../utils/statusCode'
import { NextFunction, Request, Response } from 'express'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token || req.headers.authorization

    if(!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' })
    try {
        const verifyToken = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET!)

        if(!verifyToken) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
        
        req.user = verifyToken
        next()

    } catch (error) {
        res.clearCookie('access_token')
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
    }
}