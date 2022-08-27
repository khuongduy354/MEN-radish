import { SubredditService } from "./../service/subreddit.service";
import { NextFunction, Request, Response } from "express";
const getAllSubreddits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subreddits = await SubredditService.getAllSubreddits();
    res.status(200).json({ data: subreddits });
  } catch (e) {
    next(e);
  }
};
const updateSubreddit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.username;
    const { description, subredditName } = req.body;
    const subreddits = await SubredditService.updateSubreddit(
      username,
      description,
      subredditName
    );
    res.status(200).json({ data: subreddits });
  } catch (e) {
    next(e);
  }
};
const getSubredditById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subredditId } = req.params;
    //convert subredditId to objectid
    const subreddits = await SubredditService.getSubredditById(subredditId);
    res.status(200).json({ data: subreddits });
  } catch (e) {
    next(e);
  }
};
const createSubreddit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.username;
    const { subredditName, description } = req.body;
    const subreddit = await SubredditService.createSubreddit(
      username,
      subredditName,
      description
    );
    res.status(200).json({ data: subreddit });
  } catch (e) {
    next(e);
  }
};
const subscribeSubreddit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.username;
    const { subredditId } = req.params;
    const subreddit = await SubredditService.subscribeSubreddit(
      username,
      Number(subredditId)
    );
    res.status(200).json({ data: subreddit });
  } catch (e) {
    next(e);
  }
};
export const SubredditController = {
  getAllSubreddits,
  getSubredditById,
  createSubreddit,
  updateSubreddit,
  subscribeSubreddit,
};
