import { Request, Response } from "express";

export const signOutController = async (req: Request, res: Response) => {
    return res.clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
}
