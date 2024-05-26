import express from "express";
import { login, register } from "../controllers/authController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", upload.single("profile"), register);

export default router;
