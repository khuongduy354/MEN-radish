import bcrypt from "bcrypt";
import { AppError } from "../error";
import { createJWT } from "../helper/jwtTool";
import { User } from "../models/user.model";

const signupAccount = async (username: string, password: string) => {
  try {
    //hash password
    const passwordHash = await bcrypt.hash(password, 10);
    //create new user
    const user = await User.create({ username, passwordHash });
    return user;
  } catch (e) {
    throw e;
  }
};
const signInAccount = async (username: string, password: string) => {
  try {
    //get user
    const user = await User.findOne({ username });
    if (!user) throw new AppError(404, "User not found");

    //validate password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) throw new AppError(401, "Invalid Password ");

    //create new token
    user.token = createJWT({ username: user.username });
    return user;
  } catch (e) {
    throw e;
  }
};

const updateUser = async (avatarUrl: string, userId: number) => {
  try {
    const user = await User.findByIdAndUpdate(userId, {
      avatar: { imageLink: avatarUrl },
    });
    return user;
  } catch (e) {
    throw e;
  }
};
const getUser = async (query: number) => {
  try {
    //get user
    const user = await User.findById(query).lean();
    if (!user) throw new AppError(404, "User not found");

    return user;
  } catch (e) {
    throw e;
  }
};

export default {
  signupAccount,
  updateUser,
  signInAccount,
  getUser,
};
