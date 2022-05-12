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
    subscriberCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Subreddit = mongoose.model("Subreddit", subredditSchema);
