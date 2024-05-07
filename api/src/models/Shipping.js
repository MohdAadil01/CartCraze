import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  shippingMethod: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  estimatedDeliveryDate: { type: Date },
  trackingNumber: { type: String },
});

const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;
