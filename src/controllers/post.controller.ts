import { NextFunction, Request, Response } from "express";
import { Post } from "../models/post.model";
import { PostService } from "../service/post.service";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //prepare
    const username = req.username;
    const { title, subredditName, textSubmission } = req.body;
    //pass to service layer
    const post = await PostService.createPost({
      title,
      subredditName,
      textSubmission,
      username,
    });

    res.status(200).json({ data: post });
  } catch (e) {
    next(e);
  }
};
const getPost = async (req: Request, res: Response) => {
  try {
    //prepare data
    const { id } = req.params;
    //pass to service
    const post = await PostService.getPost(Number(id));

    res.status(200).json({ data: post });
  } catch (e) {}
};
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().lean();
    const page = Number(req.query.page);
    const limit = Number(req.query.page);

    res.status(200).json({ data: posts });
  } catch (e) {}
};
const getPostsOnSearch = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const posts = await Post.find({ category: category });
    res.status(200).json({ data: posts });
  } catch (e) {}
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //prepare
    const { id } = req.params;
    const { textSubmission } = req.body;
    //pass to service
    const post = await PostService.updatePost({
      id: Number(id),
      textSubmission,
    });
    res.status(200).json({ data: post });
  } catch (e) {
    next(e);
  }
};
const deletePost = async (req: Request, res: Response) => {
  try {
    //prepare
    const { id } = req.params;
    const username = req.username;
    //pass to service
    const post = await PostService.deletePost(Number(id), username);

    res.status(200).json({ data: post });
  } catch (e) {}
};
const getSubscribedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //prepare data
    const username = req.username;

    //pass to service
    const posts = await PostService.getSubscribedPosts(username);

    res.status(200).json({ data: posts });
  } catch (e) {
    next(e);
  }
};

const upvotePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const username = req.username;
    //pass to service
    const post = await PostService.upvotePost(Number(id), username);
    res.status(200).json({ data: post });
  } catch (e) {
    next(e);
  }
};

const downvotePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const username = req.username;
    //pass to service
    const post = await PostService.downvotePost(Number(id), username);
    res.status(200).json({ data: post });
  } catch (e) {
    next(e);
  }
};

export default {
  getPostsOnSearch, // wait for ranking
  getAllPosts, //done
  createPost, //☑️
  updatePost, //☑️
  deletePost, //☑️
  getPost, // ☑️
  getSubscribedPosts, //done
  downvotePost, //☑️
  upvotePost, //☑️
};
