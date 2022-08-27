import { NextFunction, Request, Response } from "express";
import { cloudinary } from "../config/cloudinary";
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
    const { userId } = req.query;
    //pass to service
    const user = await UserService.getUser(Number(userId));

    //response
    return res.status(200).json({ data: user });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const avatarBuffer = req.file?.buffer;
    const userId = req.userId;
    if (avatarBuffer) {
      cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          throw new AppError(500, "Cannot upload to Cloudinary");
        } else {
          // return result;
          // pass url to avatar service
          const avatarUrl = "";
          const updatedUser = UserService.updateUser(avatarUrl, userId);
        }
      });
    } else {
      throw new AppError(400, "Invalid Avatar");
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  signupAccount, //
  getUser, //
  updateUser,
  signInAccount, //
};
