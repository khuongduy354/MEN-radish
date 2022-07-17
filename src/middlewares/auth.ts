import { AppError } from "./../error";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { parseJWT } from "../helper/jwtTool";
import { User } from "../models/user.model";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get token
    const token =
      req.headers["x-auth-token"] ||
      req.body.token ||
      req.headers["authorization"];

    if (!token) next(new AppError(401, "Invalid token"));

    //get username from token
    const parsedToken = parseJWT(token);
    const username = (parsedToken as JwtPayload).username;

    //ensures user exists
    const user = await User.findOne({ username });
    if (user) {
      req.username = username;
      req.userId = user._id;
      next();
    } else {
      next(new AppError(401, "Invalid token"));
    }
  } catch (e) {
    next(new AppError(401, "Invalid token"));
  }
};
