import { auth } from "./../middlewares/auth";
import { Router } from "express";
import userController from "../controllers/user.controller";
import multer from "multer";
const router = Router();

//store multer buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get("/user", userController.getUser);
router.post("/me/signup", auth, userController.signupAccount);
router.post("/me/login", auth, userController.signInAccount);
router.put("/user/avatar", upload.single("avatar"), userController.updateUser);
export default router;
