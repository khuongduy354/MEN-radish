import { createJWT } from "./../helper/jwtTool";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user.model";

const signupAccount = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    //hash password
    const passwordHash = await bcrypt.hash(password, 10);
    //create new user
    const user = await User.create({ username, passwordHash });
    res.status(201).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const signInAccount = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const { password } = req.body;
    //compare user password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    //create new token
    user.token = createJWT({ username: user.username });

    return res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    //find user
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const uploadAvatar = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const updateUser = async (req: Request, res: Response) => {
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
