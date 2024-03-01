import { Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken'
import { statusCode } from "../../utils/statusCode";

export const signOutController = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log(token)

    if(!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
    
    authHeader && jsonwebtoken.sign(token, "", { expiresIn: 1 }, (logout, err) => {
        if(logout) return res.status(statusCode.OK).json({ message: 'Sign out successful' })
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
    })    
}