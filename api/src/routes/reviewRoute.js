import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/:productId", verifyToken, createReview);
router.get("/:productId/:reviewId", verifyToken, getReview);
router.put("/:productId/:reviewId", verifyToken, updateReview);
router.delete("/:productId/:reviewId", verifyToken, deleteReview);

export default router;
