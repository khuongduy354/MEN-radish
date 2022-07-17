import { Comment } from "../models/comment.model";
import { AppError } from "../error";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
type createCommentProp = {
  post_id: string;
  content: string;
  username: string;
};
type upvoteCommentProp = {
  comment_id: string;
  post_id: string;
  username: string;
};
type downvoteCommentProp = {
  comment_id: string;
  post_id: string;
  username: string;
};
const createComment = async (createCommentProp: createCommentProp) => {
  try {
    const { post_id, content, username } = createCommentProp;

    const post = await Post.findById(post_id);
    const user = await User.findOne({ username });

    // make sure data exist
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    if (!user) {
      throw new AppError(404, "User not found");
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

    return post;
  } catch (e) {
    throw e;
  }
};
const upvoteComment = async (upvoteCommentProp: upvoteCommentProp) => {
  try {
    //prepare
    const { comment_id, post_id, username } = upvoteCommentProp;
    const post = await Post.findById(post_id).populate("comments");
    const user = await User.findOne({ username });
    const targetComment = await Comment.findById(comment_id);

    //ensure exists
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    if (!user) {
      throw new AppError(404, "User not found");
    }
    if (!targetComment) {
      throw new AppError(404, "Comment not found");
    }

    //update comment

    //toggle upvotes

    if (!targetComment.upvotedBy.includes(user._id)) {
      targetComment.upvotedBy.push(user._id);
    } else {
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

    return post;
  } catch (e) {
    throw e;
  }
};

const downvoteComment = async (downvoteCommentProp: downvoteCommentProp) => {
  try {
    const { comment_id, post_id, username } = downvoteCommentProp;
    const post = await Post.findById(post_id).populate("comments");
    const user = await User.findOne({ username });
    const targetComment = await Comment.findById(comment_id);

    //ensure exists
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    if (!user) {
      throw new AppError(404, "User not found");
    }
    if (!targetComment) {
      throw new AppError(404, "Comment not found");
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

    return post;
  } catch (e) {
    throw e;
  }
};

export const CommentService = {
  createComment, //☑️
  upvoteComment, //☑️
  downvoteComment, //☑️
};
