import express from "express";
import { loginController, signupController } from "../controller/auth.controller";
const authRouter = express.Router();

authRouter.get("/login", loginController);
authRouter.get("/signup", signupController);

export default authRouter;