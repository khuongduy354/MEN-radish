import { AppError } from "./../error";
import { Post } from "../models/post.model";
import { Subreddit } from "../models/subreddit.model";
import { paginatePages } from "../helper/paginatePages";
import { User } from "../models/user.model";

type createPostProp = {
  title: string;
  subredditName: string;
  textSubmission: string;
  username: string;
};
const createPost = async (createPostProp: createPostProp) => {
  try {
    //prepare
    const { username, title, subredditName, textSubmission } = createPostProp;
    const author = await User.findOne({ username });
    const subreddit = await Subreddit.findOne({
      subredditName: subredditName,
    });

    //ensure exists
    if (!author) {
      throw new AppError(404, "Author does not exist");
    }

    if (!subreddit) {
      throw new AppError(404, "Subreddit does not exist");
    }

    //create post
    const post = await Post.create({
      title,
      author: author._id,
      subreddit: subreddit._id,
      textSubmission,
    });
    author.posts = author.posts.concat(post._id);
    await author.save();
    subreddit.posts = subreddit.posts.concat(post._id);
    await subreddit.save();
    await post.populate("author", "username");
    await post.populate("subreddit", "subredditName");
    return post;
  } catch (e) {
    throw e;
  }
};
const getPost = async (id: number, page: number, itemsPerPage: number) => {
  try {
    const post = await Post.findById(id)
      .populate("author", "username")
      .populate("subreddit", "subredditName");

    return post;
  } catch (e) {
    throw e;
  }
};

type updatePostProp = {
  id: number;
  textSubmission: string;
};
const updatePost = async (updatePostProp: updatePostProp) => {
  try {
    const { textSubmission, id } = updatePostProp;
    //update post
    const post = await Post.findByIdAndUpdate(
      id,
      { textSubmission },
      {
        new: true,
      }
    );

    //ensure exists
    if (!post) {
      throw new AppError(404, "Post does not exist");
    }

    await post.populate("author", "username");
    await post.populate("subreddit", "subredditName");
    return post;
  } catch (e) {
    throw e;
  }
};
const deletePost = async (id: number, username: string) => {
  try {
    //prepare and ensure exists
    const post = await Post.findById(id);
    const author = await User.findById(username);

    if (!post) throw new AppError(404, "Post does not exist");
    if (!author) throw new AppError(404, "Author does not exist");

    const subreddit = await Subreddit.findById(post.subreddit);
    if (!subreddit) throw new AppError(404, "Subreddit does not exist");

    //delete posts
    await Post.findByIdAndDelete(id);

    //remove post from subreddit
    const postId = post._id;
    subreddit.posts = subreddit.posts.filter((_postId) => _postId !== postId);
    await subreddit.save();

    //remove post from author
    author.posts = author.posts.filter((_postId) => _postId !== postId);
    await author.save();

    return post;
  } catch (e) {
    throw e;
  }
};
const upvotePost = async (id: number, username: string) => {
  try {
    const user = await User.findOne({ username });
    const post = await Post.findById(id);
    //ensure exists
    if (!user) throw new AppError(404, "User does not exist");
    if (!post) throw new AppError(404, "Post does not exist");

    //toggle upvote
    if (post.upvotedBy.includes(user._id)) {
      post.upvotedBy = post.upvotedBy.filter((userId) => userId !== user._id);
    } else {
      post.upvotedBy.push(user._id);
    }

    //remove downvote if exists
    post.downvotedBy = post.downvotedBy.filter(
      (userId: any) => userId !== user._id
    );
    await post.save();
    return post;
  } catch (e) {
    throw e;
  }
};
const downvotePost = async (id: number, username: string) => {
  try {
    const user = await User.findOne({ username });
    const post = await Post.findById(id);
    //ensure exists
    if (!user) throw new AppError(404, "User does not exist");
    if (!post) throw new AppError(404, "Post does not exist");

    //toggle downvote
    if (post.downvotedBy.includes(user._id)) {
      post.downvotedBy = post.downvotedBy.filter(
        (userId) => userId !== user._id
      );
    } else {
      post.downvotedBy.push(user._id);
    }

    //remove upvote if exists
    post.upvotedBy = post.upvotedBy.filter(
      (userId: any) => userId !== user._id
    );
    await post.save();
    return post;
  } catch (e) {
    throw e;
  }
};
const getSubscribedPosts = async (
  username: string,
  currentPage: number,
  perPage: number
) => {
  try {
    //prepare data
    const user = await User.findOne({ username }).populate("subscribedSubs");
    if (!user) throw new AppError(404, "User does not exist");

    const postCounts = await Post.countDocuments();
    let paginatedData = paginatePages(currentPage, perPage, postCounts);

    const tempPosts = await Post.find({
      _id: { $in: user.subscribedSubs },
    })
      .select("-comments")
      .skip(paginatedData.skipPages)
      .populate("author", "username")
      .populate("subreddit", "subredditName");

    if (!tempPosts) throw new AppError(404, "Post does not exist");

    const paginatedPosts = {
      current: tempPosts,
      previous: paginatedData.previousPage,
      next: paginatedData.nextPage,
    };

    return paginatedPosts;
  } catch (e) {
    throw e;
  }
};

export const PostService = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getSubscribedPosts,
  upvotePost,
  downvotePost,
};
