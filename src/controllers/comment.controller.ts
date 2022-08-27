import { CommentService } from "./../service/comment.service";
import { Response, Request, NextFunction } from "express";
const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //prepare
    const { postId } = req.params;
    const { content } = req.body;
    const username = req.username;
    //pass to service layer
    const post = await CommentService.createComment({
      post_id: postId,
      content,
      username,
    });
    //response
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
    const { id, post_id } = req.params;
    const username = req.username;

    //pass to service layer
    const post = await CommentService.upvoteComment({
      id: Number(id),
      post_id,
      username,
    });

    //response
    res.status(203).json({ data: post });
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
    const { id, post_id } = req.params;
    const username = req.username;
    //pass to service layer
    const post = await CommentService.downvoteComment({
      id: Number(id),
      post_id,
      username,
    });
    //response
    res.status(203).json({ data: post });
  } catch (e) {
    next(e);
  }
};

export const CommentController = {
  postComment, //☑️
  upvoteComment, //☑️
  downvoteComment, //☑️
};
