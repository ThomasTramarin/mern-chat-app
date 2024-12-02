import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
  };
}

const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }


    const user = await User.findById(_id).select("_id");
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }


    req.user = { _id: user._id };
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;