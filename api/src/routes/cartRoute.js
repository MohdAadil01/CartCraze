import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/jwt.js";
const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCartItems);
router.put("/", verifyToken, updateCart);
router.delete("/", verifyToken, removeFromCart);

export default router;
