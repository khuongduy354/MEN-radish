import { auth } from "./../middlewares/auth";
import { Router } from "express";
const router = Router();
import { SubredditController } from "../controllers/subreddit.controller";

router.get("/subreddits", SubredditController.getAllSubreddits);
router.get("/subreddits/:subredditId", SubredditController.getSubredditById);

router.patch(
  "/subreddits/:subredditId",
  auth,
  SubredditController.updateSubreddit
);

router.post("/subreddit", auth, SubredditController.createSubreddit);
router.post(
  "/subreddits/:subredditId",
  auth,
  SubredditController.subscribeSubreddit
);

export default router;
