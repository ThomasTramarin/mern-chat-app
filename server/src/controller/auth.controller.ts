import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET!, { expiresIn: "3d" });
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id.toString());
        
        res.status(200).json({ email, token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const signupUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);

        const token = createToken(user._id.toString());

        res.status(200).json({ email, token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}