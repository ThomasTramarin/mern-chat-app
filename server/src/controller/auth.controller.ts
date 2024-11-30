import { Request, Response } from "express";

export const loginController = (req: Request, res: Response) => {
    res.json({name: "moge"});
}

export const signupController = (req: Request, res: Response) => {
    res.json({name: "moges"});
}