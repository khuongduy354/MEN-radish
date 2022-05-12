import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commentBody: {
      type: String,
      trim: true,
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
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    textSubmission: {
      type: String,
      trim: true,
    },
    linkSubmission: {
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
    comments: [commentSchema],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
