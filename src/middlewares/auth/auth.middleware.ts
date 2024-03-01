import jsonwebtoken from 'jsonwebtoken'
import { statusCode } from '../../utils/statusCode'
import { NextFunction, Request, Response } from 'express'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' })
    try {
        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
            if(err) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
    }
}