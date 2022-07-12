import mongoose, { ObjectId } from "mongoose";

export interface IComment extends mongoose.Document {
  commentedBy: ObjectId;
  commentBody: String;
  upvotedBy: Array<ObjectId>;
  downvotedBy: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
