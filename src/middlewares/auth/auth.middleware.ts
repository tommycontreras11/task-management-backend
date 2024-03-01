import jsonwebtoken from 'jsonwebtoken'
import { statusCode } from '../../utils/statusCode'
import { NextFunction, Request, Response } from 'express'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' })
    try {
        const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET!)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
    }
}