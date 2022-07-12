import mongoose, { ObjectId } from "mongoose";
type Comment = {
  commentedBy: ObjectId;
  commentBody: String;
  upvotedBy: Array<ObjectId>;
  downvotedBy: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
};
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
  comments: Array<Comment>;
  createdAt: Date;
  updatedAt: Date;
}
