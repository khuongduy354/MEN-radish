import { auth } from "./../middlewares/auth";
import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
const router = Router();

router.post(
  "/comments/:comment_id/downvote",
  CommentController.downvoteComment
);
router.post("/comments/:comment_id/upvote", CommentController.upvoteComment);
router.post("/posts/:postId/comment", auth, CommentController.postComment);

// router.put("/comments/:commentId",CommentController.updateComment);

// router.delete("/comments/:commentId",CommentController.);

export default router;
