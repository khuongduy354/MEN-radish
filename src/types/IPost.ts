import mongoose, { ObjectId } from "mongoose";
import { IComment } from "./IComment";

export interface IPost extends mongoose.Document {
  title: String;
  textSubmission: String;
  linkSubmission: String;
  imageLink: String;
  category: String;
  subreddit: ObjectId;
  author: ObjectId;
  upvotedBy: Array<ObjectId>;
  downvotedBy: Array<ObjectId>;
  comments: Array<IComment>;
  createdAt: Date;
  updatedAt: Date;
}
