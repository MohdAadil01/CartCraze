// const addressSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     addressLine1: { type: String, required: true },
//     addressLine2: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     country: { type: String, required: true },
//     postalCode: { type: String, required: true },
//   });

import createHttpError from "http-errors";
import Address from "../models/Address.js";
import User from "../models/User.js";

export const createAddress = async (req, res, next) => {
  const { addressLine1, addressLine2, city, state, country, postalCode } =
    req.body;
  if (!addressLine1 || !city || !state || !country || !postalCode) {
    return next(createHttpError(500, "Please enter required fields."));
  }
  const user = await User.findOne({ email: req.user });
  if (!user) {
    return next(createHttpError(500, "User not found."));
  }
  try {
    const address = await Address.create({
      user: user._id,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { address: address._id },
      { new: true }
    );
    res.json({
      success: true,
      message: "Address added.",
      address,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while adding address. " + error));
  }
};

export const getAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const address = await Address.findById(id);
    if (!address) {
      return next(createHttpError(500, "Address not found."));
    }
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(500, "User not found."));
    }
    if (address._id.toString() === user.address.toString()) {
      res.json({
        success: true,
        address,
      });
    } else {
      return next(createHttpError(500, "Address not matched with the user."));
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while address for the user from the database. " + error
      )
    );
  }
};

export const updateAddress = async (req, res, next) => {
  const { id } = req.params;
  const { addressLine1, addressLine2, city, state, country, postalCode } =
    req.body;
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(404, "User not found."));
    }
    if (user.address && user.address.toString() === id) {
      const address = await Address.findByIdAndUpdate(
        id,
        { addressLine1, addressLine2, city, state, country, postalCode },
        { new: true }
      );
      if (!address) {
        return next(createHttpError(404, "Address not found."));
      }
      res.json({
        success: true,
        message: "Updated.",
        address,
      });
    } else {
      return next(createHttpError(404, "Address not associated with user."));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error while updating the address. " + error.message)
    );
  }
};

export const deleteAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ email: req.user });
    if (!user) {
      return next(createHttpError(404, "User not found."));
    }
    if (user.address && user.address.toString() === id) {
      const address = await Address.findById(id);
      if (!address) {
        return next(createHttpError(500, "Address not found. "));
      }

      await Address.findByIdAndDelete(id);
      user.address = null;
      await user.save();
      res.json({
        success: true,
        message: "Successfully deleted the address.",
      });
    } else {
      return next(createHttpError(404, "Address not associated with user."));
    }
  } catch (error) {
    return next(
      createHttpError(500, "Error while deleting address: " + error.message)
    );
  }
};
