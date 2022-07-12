import mongoose, { ObjectId } from "mongoose";

type Avatar = {
  exists: boolean;
  imageLink: string;
  imageId: string;
};
export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  passwordHash: string;
  avatar: Avatar;
  posts: Array<ObjectId>;
  subscribedSubs: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
