import { IUser } from "./../types/IUser";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
      exists: {
        type: Boolean,
        default: "false",
      },
      imageLink: {
        type: String,
        trim: true,
        default: "null",
      },
      imageId: {
        type: String,
        trim: true,
        default: "null",
      },
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    subscribedSubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subreddit",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
