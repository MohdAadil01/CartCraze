import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/addressController.js";
const router = express.Router();

router.post("/create", createAddress);
router.get("/get", getAddress);
router.put("/update", updateAddress);
router.delete("/delete", deleteAddress);

export default router;
