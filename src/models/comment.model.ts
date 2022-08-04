import { IComment } from "./../types/IComment";
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
export const Comment = mongoose.model<IComment>("Comment", commentSchema);
