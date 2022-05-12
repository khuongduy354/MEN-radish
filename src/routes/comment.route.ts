import { Router } from "express";
const router = Router();

router.route("/post/comment");

router.post("/downvote/:comment_id");
router.post("/upvote/:comment_id");
router.post("/:video_id");

router.put("/comment/comment_:id");

router.delete("/:comment_id");

export default router;
