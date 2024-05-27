import createHttpError from "http-errors";
import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const createReview = async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "Unable to find user in database."));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(createHttpError(500, "Unable to find product in database."));
    }
    const review = await Review.create({
      user: user._id,
      product: new mongoose.Types.ObjectId(productId),
      rating,
      comment,
    });
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        reviews: review._id,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Review added.",
      review,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating review. " + error));
  }
};

export const updateReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "Unable to find user in database."));
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(createHttpError(500, "Unable to find review in database."));
    }
    if (user._id.toString() !== review.user.toString()) {
      return next(createHttpError(500, "Unauthorized."));
    }
    const updatedReview = await Review.findByIdAndUpdate(reviewId, {
      rating,
      comment,
    });

    res.json({
      success: true,
      message: "Review updated.",
      updatedReview,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while updating review. " + error));
  }
};
export const getReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "Unable to find user in database."));
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(createHttpError(500, "Unable to find review in database."));
    }
    if (user._id.toString() !== review.user.toString()) {
      return next(createHttpError(500, "Unauthorized."));
    }
    res.json({
      success: true,
      review,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while getting review. " + error));
  }
};

export const deleteReview = async (req, res, next) => {
  const { reviewId, productId } = req.params;
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "Unable to find user in database."));
    }
    const review = await Review.findById(reviewId);
    const product = await Product.findById(productId);
    if (!product) {
      return next(createHttpError(500, "Unable to find product in database."));
    }
    if (!review) {
      return next(createHttpError(500, "Unable to find review in database."));
    }
    if (user._id.toString() !== review.user.toString()) {
      return next(createHttpError(500, "Unauthorized."));
    }
    product.reviews.pull(reviewId);
    await product.save();
    await Review.findByIdAndDelete(reviewId);
    res.json({
      success: true,
      message: "Successfully removed the review.",
    });
  } catch (error) {
    return next(createHttpError(500, "Error while getting review. " + error));
  }
};
