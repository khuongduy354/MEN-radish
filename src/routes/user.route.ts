import { Router } from "express";
import userController from "../controllers/user.controller";
import multer from "multer";
const router = Router();

//store multer buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });
// router.get("/user", userController.getUser);

router.post("/me/signup", userController.signupAccount);
router.post("/me/login", userController.signInAccount);
// router.post("/user/avatar", upload.single("avatar"), userController.updateUser);
export default router;
