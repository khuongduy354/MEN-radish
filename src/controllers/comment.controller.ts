import { AppError } from "./../error";
import { Response, Request, NextFunction } from "express";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { Comment } from "../models/comment.model";
import { ObjectId } from "mongoose";
const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //prepare data
    const { post_id } = req.params;
    const { content } = req.body;
    const username = req.username;

    const post = await Post.findById(post_id).populate("comments");
    const user = await User.findOne({ username });

    // make sure data exist
    if (!post) {
      return next(new AppError(404, "Post not found"));
    }
    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    //create comment
    const newComment = new Comment({
      commentedBy: user._id,
      commentBody: content,
      upvotedBy: [user._id],
      downvotedBy: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newComment.save();

    //add comment to post
    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ data: post });
  } catch (e) {
    next(e);
  }
};
const upvoteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //prepare
    const { comment_id, post_id } = req.params;
    const username = req.username;

    const post = await Post.findById(post_id).populate("comments");
    const user = await User.findOne({ username });
    const targetComment = await Comment.findById(comment_id);

    //ensure exists
    if (!post) {
      return next(new AppError(404, "Post not found"));
    }
    if (!user) {
      return next(new AppError(404, "User not found"));
    }
    if (!targetComment) {
      return next(new AppError(404, "Comment not found"));
    }

    //update comment

    //toggle upvotes

    if (!targetComment.upvotedBy.includes(user._id)) {
      targetComment.upvotedBy.push(user._id);
    }

    if (targetComment.upvotedBy.includes(user._id)) {
      targetComment.upvotedBy = targetComment.upvotedBy.filter(
        (_userId) => _userId !== user._id
      );
    }

    //remove downvote if exists
    if (targetComment.downvotedBy.includes(user._id)) {
      targetComment.downvotedBy = targetComment.downvotedBy.filter(
        (_userId) => _userId !== user._id
      );
    }

    //update post
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === comment_id
    );
    post.comments[commentIndex] = targetComment;
    await post.save();

    //response
    res.status(200).json({ data: post });
  } catch (e) {
    next(e);
  }
};

const downvoteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //prepare
    const { comment_id, post_id } = req.params;
    const username = req.username;

    const post = await Post.findById(post_id).populate("comments");
    const user = await User.findOne({ username });
    const targetComment = await Comment.findById(comment_id);

    //ensure exists
    if (!post) {
      return next(new AppError(404, "Post not found"));
    }
    if (!user) {
      return next(new AppError(404, "User not found"));
    }
    if (!targetComment) {
      return next(new AppError(404, "Comment not found"));
    }

    //toggle downvotes
    if (!targetComment.downvotedBy.includes(user._id)) {
      targetComment.downvotedBy.push(user._id);
    }

    if (targetComment.downvotedBy.includes(user._id)) {
      targetComment.downvotedBy = targetComment.downvotedBy.filter(
        (_userId) => _userId !== user._id
      );
    }

    //remove upvote if exists
    if (targetComment.upvotedBy.includes(user._id)) {
      targetComment.upvotedBy = targetComment.upvotedBy.filter(
        (_userId) => _userId !== user._id
      );
    }

    //update post
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === comment_id
    );
    post.comments[commentIndex] = targetComment;
    await post.save();

    res.status(203).json({ data: post });
  } catch (e) {
    next(e);
  }
};

export default { postComment, upvoteComment, downvoteComment };
