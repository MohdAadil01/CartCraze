import createHttpError from "http-errors";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const order = async (req, res, next) => {
  try {
    const { products, totalPrice } = req.body;
    console.log(products, totalPrice);
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User not found."));
    }
    const order = await Order.create({
      user: user._id,
      products,
      totalPrice,
    });

    res.json({
      success: true,
      order,
      message: "Order placed successfully",
    });
  } catch (error) {
    next(
      createHttpError(500, "Failed to place order. Please try again later.")
    );
  }
};

export const getSingleOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User not found."));
    }
    const order = await Order.findById(orderId);

    if (!order) {
      return next(createHttpError(404, "Order not found"));
    }

    if (user._id.toString() !== order.user.toString()) {
      return next(createHttpError(404, "Unauthorized to access this order."));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(createHttpError(500, "Failed to fetch order ." + error));
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User not found."));
    }
    const orders = await Order.find({ user: user._id });
    if (!orders) {
      return next(createHttpError(500, "No orders found."));
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(createHttpError(500, "Failed to fetch orders"));
  }
};

export const cancelOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByIdAndUpdate(orderId, {
      status: "Cancelled",
    });

    if (!order) {
      return next(createHttpError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    next(createHttpError(500, "Failed to cancel order"));
  }
};
