import mongoose, { ObjectId } from "mongoose";

export interface IComment {
  _id: ObjectId;
  commentedBy: ObjectId;
  commentBody: String;
  upvotedBy: Array<ObjectId>;
  downvotedBy: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
