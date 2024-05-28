import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCart,
} from "../controllers/cartController";
import verifyToken from "../middlewares/jwt.js";
const router = express.Router();

router.post("/:userId", verifyToken, addToCart);
router.get("/:userId", verifyToken, getCartItems);
router.put("/:userId/:productId", verifyToken, updateCart);
router.delete("/:userId/:productId", verifyToken, removeFromCart);

export default router;
