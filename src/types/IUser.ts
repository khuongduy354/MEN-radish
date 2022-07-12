import mongoose, { ObjectId } from "mongoose";

type Avatar = {
  exists: boolean;
  imageLink: string;
  imageId: string;
};
export interface IUser {
  _id: ObjectId;
  email: string;
  username: string;
  passwordHash: string;
  avatar: Avatar;
  posts: Array<ObjectId>;
  subscribedSubs: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
