import { Application } from "express";
import ProductRouter from "./post.route";
import UserRouter from "./user.route";
import SubredditRouter from "./subreddit.route";
import CommentRouter from "./comment.route";
export const ConfigRoute = (app: Application) => {
  app.use("/v1", ProductRouter);
  app.use("/v1", UserRouter);
  app.use("/v1", CommentRouter);
  app.use("/v1", SubredditRouter);
};
