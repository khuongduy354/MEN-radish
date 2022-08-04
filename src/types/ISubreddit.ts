import { ObjectId } from "mongoose";

export interface ISubreddit {
  _id: ObjectId;
  subredditName: string;
  description: string;
  posts: Array<ObjectId>;
  admin: ObjectId;
  subscribedBy: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
