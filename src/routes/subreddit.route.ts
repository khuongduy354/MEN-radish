import { Router } from "express";
const router = Router();
import { SubredditController } from "../controllers/subreddit.controller";

router.get("/subreddits", SubredditController.getAllSubreddits);
router.get("/subreddits/:subredditId", SubredditController.getSubredditById);

router.patch("/subreddits/:subredditId", SubredditController.updateSubreddit);

router.post("/subreddit", SubredditController.createSubreddit);
router.post("/subreddits/:subredditId", SubredditController.subscribeSubreddit);

export default router;
