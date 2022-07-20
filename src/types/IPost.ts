import mongoose, { ObjectId } from "mongoose";
import { IComment } from "./IComment";

export interface IPost {
  _id: ObjectId;
  title: String;
  description: String;
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
