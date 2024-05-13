import express from "express";
import { profile } from "../controllers/profileController.js";
const router = express.Router();

router.get("/profile", profile);

export default router;
