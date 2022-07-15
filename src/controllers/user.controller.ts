import { NextFunction, Request, Response } from "express";
import { UserService } from "../service";
import { AppError } from "../error";

const signupAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //prepare
    const { username, password } = req.body;

    //pass to service
    const user = await UserService.signupAccount(username, password);

    res.status(201).json({ data: user });
  } catch (e) {
    next(e);
  }
};
const signInAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //prepare
    const username = req.username;
    const { password } = req.body;
    //pass to service
    const user = await UserService.signInAccount(username, password);

    return res.status(200).json({ data: user });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //prepare query
    const { userId, userEmail } = req.query;
    let query: string | number;

    if (userId && !isNaN(Number(userId))) {
      query = Number(userId);
    } else if (userEmail) {
      query = userEmail.toString();
    } else {
      throw new AppError(400, "Bad request");
    }

    //pass to service
    const user = await UserService.getUser(query);

    //response
    return res.status(200).json({ data: user });
  } catch (e) {
    next(e);
  }
};

const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  signupAccount, //☑️
  getUser, //☑️
  uploadAvatar,
  updateUser,
  signInAccount, //☑️
};
