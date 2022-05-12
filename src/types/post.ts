import mongoose, { ObjectId } from "mongoose";

// export interface CommentDocument extends mongoose.Document {

export interface PostDocument extends mongoose.Document {
  title: String;
  postType: String;
  textSubmission: String;
  linkSubmission: String;
  imageSubmission: {
    imageLink: String;
    imageId: String;
  };
  subreddit: Array<ObjectId>;
  author: Array<ObjectId>;
  upvotedBy: Array<ObjectId>;
  downvotedBy: Array<ObjectId>;
  // comments: Array<CommentDocument>;
  commentCount: number;
}
