import { ObjectId } from "mongoose";
import { Subreddit } from "./../models/subreddit.model";
import bcrypt from "bcrypt";
import { AppError } from "../error";
import { createJWT } from "../helper/jwtTool";
import { User } from "../models/user.model";

const getAllSubreddits = async () => {
  try {
    const subreddits = Subreddit.find({});
    return subreddits;
  } catch (e) {
    throw e;
  }
};

const getSubredditById = async (id: string) => {
  try {
    const subreddit = await Subreddit.findById(id);
    if (!subreddit) {
      throw new AppError(404, "Subreddit not found");
    }
    return subreddit;
  } catch (e) {
    throw e;
  }
};
const createSubreddit = async (
  username: string,
  subredditName: string,
  description: string
) => {
  try {
    const subreddit = await Subreddit.create({
      name: subredditName,
      description: description,
      creator: username,
      subscribers: [username],
    }).catch((e) => {
      throw e;
    });
    if (!subreddit) throw new AppError(404, "Subreddit not created");
    return subreddit;
  } catch (e) {
    throw e;
  }
};
const updateSubreddit = async (
  username: string,
  description: string,
  subredditName: string
) => {
  try {
    const subreddit = await Subreddit.findOneAndUpdate(
      { subredditName },
      {
        description: description,
      }
    );
    //TODO:db error handling
    if (!subreddit) throw new AppError(404, "Subreddit not found");

    return subreddit;
  } catch (e) {
    throw e;
  }
};
const subscribeSubreddit = async (username: string, subredditId: number) => {
  try {
    //prepare
    const subreddit = await Subreddit.findById(subredditId);
    const user = await User.findOne({ username });

    //ensure exists
    if (!subreddit) throw new AppError(404, "Subreddit not found");
    if (!user) throw new AppError(404, "User not found");

    // add subscriber to subreddit
    if (!subreddit.subscribedBy.includes(user._id))
      subreddit.subscribedBy.push(user._id);

    return subreddit;
  } catch (e) {
    throw e;
  }
};

export const SubredditService = {
  getAllSubreddits,
  getSubredditById,
  createSubreddit,
  updateSubreddit,
  subscribeSubreddit,
};
