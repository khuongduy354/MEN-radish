import { Router } from "express";
import userController from "../controllers/user.controller";
import multer from "multer";
const router = Router();

//store multer buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/user/:userId", userController.getUser);

router.post("/user/signup", userController.signupAccount);
router.post("/user/login", userController.signInAccount);
router.post(
  "/user/avatar",
  upload.single("avatar"),
  userController.uploadAvatar
);
export default router;
