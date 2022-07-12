import { ISubreddit } from "./../types/ISubreddit";
import mongoose from "mongoose";
const subredditSchema = new mongoose.Schema(
  {
    subredditName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subscribedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Subreddit = mongoose.model<ISubreddit>(
  "Subreddit",
  subredditSchema
);
