import { Router } from "express";
const router = Router();

router.get("/subreddits");
router.get("/subreddit/:subName");

router.put("/subreddit/:subName");

router.post("/subreddit");
router.post("/subreddit/subscribe/:subName");

export default router;
