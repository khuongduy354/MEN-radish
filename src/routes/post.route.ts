import { auth } from "./../middlewares/auth";
import { Router } from "express";
import postController from "../controllers/post.controller";
const router = Router();

router.get("/posts", postController.getAllPosts);
// router.get("/posts/search?q=adasd", postController.getPostsOnSearch);
router.get("/posts/:id", postController.getPost);
router.get("me/posts/subscribed", postController.getSubscribedPosts);

router.post("/post", postController.createPost);
router.post("/posts/:id/downvote", postController.downvotePost);
router.post("/post/:id/upvote", auth, postController.upvotePost);

router.put("/posts/:id", postController.updatePost);

router.delete("/posts/:id", postController.deletePost);

export default router;
