import express from "express";
import {
  cancelOrder,
  getSingleOrder,
  getAllOrder,
  order,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/jwt.js";
const router = express.Router();

router.post("/", verifyToken, order);
router.get("/", verifyToken, getAllOrder);
router.get("/:orderId", verifyToken, getSingleOrder);
router.put("/:orderId", verifyToken, cancelOrder);

export default router;
