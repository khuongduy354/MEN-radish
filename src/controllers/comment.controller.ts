import { Response, Request } from "express";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
const postComment = async (req: Request, res: Response) => {
  try {
    const { video_id } = req.params;
    const { comment } = req.body;
    const username = req.username;
    const post = await Post.findById(video_id).populate("comments");
    const user = await User.findOne({ username });
    comment.commentedBy = user._id;

    post.comments.push({
      commentedBy: user._id,
      commentBody: comment,
      upvotedBy: [user._id],
    });
    await post.save();
    res.status(200).json({ data: post });
  } catch (e) {}
};
export default { postComment };
