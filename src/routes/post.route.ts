import { auth } from "./../middlewares/auth";
import { Router } from "express";
import postController from "../controllers/post.controller";
const router = Router();

router.get("/posts", postController.getAllPosts);
router.get("/post/search", postController.getPostsOnSearch);
router.get("/post/:id", postController.getPost);
router.get("/posts/subscribed", postController.getSubscribedPosts);

router.post("/post", postController.createPost);
router.post("/post/downvote/:id", postController.downvotePost);
router.post("/post/upvote/:id", auth, postController.upvotePost);

router.put("/post/:id", postController.updatePost);

router.delete("/post/:id", postController.deletePost);

export default router;
