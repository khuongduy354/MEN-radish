import mongoose from "mongoose";
import { IPost } from "../types/IPost";
import { Comment } from "./comment.model";

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageLink: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subreddit",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [Comment],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
