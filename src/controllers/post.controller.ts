import { Subreddit } from "./../models/subreddit.model";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, subredditName, textSubmission } = req.body;

    const author = await User.findOne({ username: req.username });
    const subreddit = await Subreddit.findOne({
      subredditName: subredditName,
    });
    if (!author) {
      return res
        .status(404)
        .send({ message: "User does not exist in database." });
    }

    if (!subreddit) {
      return res.status(404).send({
        message: `Subreddit with ID: '${subreddit}' does not exist in database.`,
      });
    }

    const post = await Post.create({
      title,
      author: author._id,
      subreddit: subreddit.subredditName,
      textSubmission,
    });
    author.posts = author.posts.concat(post._id);
    await author.save();
    subreddit.posts = subreddit.posts.concat(post._id);
    await subreddit.save();
    await post
      .populate("author", "username")
      .populate("subreddit", "subredditName")
      .execPopulate();

    res.status(200).json({ data: post });
  } catch (e) {}
};
const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
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

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { textSubmission } = req.body;
    //update post
    const post = await Post.findByIdAndUpdate(id, textSubmission, {
      new: true,
    });
    if (!post) return res.status(404).send({ message: "Post does not exist." });
    //check if user is author
    if (post.author !== req.username)
      return res.status(401).send({ message: "Unauthorized" });
    //populate
    post
      .populate("author", "username")
      .populate("subreddit", "subredditName")
      .execPopulate();
    res.status(200).json({ data: post });
  } catch (e) {}
};
const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //check if user is author
    const post = await Post.findById(id).populate("author", "username");
    const subreddit = await Subreddit.findById(post.subredditName);
    const author = await User.findById(req.username);
    if (post.author.username !== req.username)
      return res.status(401).send({ message: "Unauthorized" });

    //delete post
    await Post.findByIdAndDelete(id);

    //delete post in subreddit
    subreddit.posts = subreddit.posts.filter(
      (subPostId: any) => subPostId !== post._id
    );
    await subreddit.save();

    //delete post in author
    author.posts = post.author.posts.filter(
      (userPostId: any) => userPostId !== post._id
    );
    await author.save();
    res.status(200).json({ data: post });
  } catch (e) {}
};
const getSubscribedPosts = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    // const posts = await Post.find({ : username });
    // res.json({ data: posts });
  } catch (e) {}
};

const upvotePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.status(200).json({ data: post });
  } catch (e) {}
};

const downvotePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { downvote: 1 } },
      { new: true }
    );
    res.status(200).json({ data: post });
  } catch (e) {}
};

export default {
  createPost, //☑️
  updatePost, //☑️
  getPostsOnSearch,
  getAllPosts,
  deletePost, //☑️
  getPost,
  getSubscribedPosts,
  downvotePost,
  upvotePost,
};
