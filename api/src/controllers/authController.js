import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  const { username, email, password, address, phone } = req.body;
  if (!username || !email || !password || !address || !phone) {
    return next(createHttpError(400, "Please Enter all fields."));
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return next(
        createHttpError(400, "User already exists. Please Login to continue.")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error in finding the user."));
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    res.status(200).json({
      message: "Successfully Registered.",
      user: newUser,
    });
  } catch (error) {
    return next(createHttpError(500, "Error in Registering the user."));
  }
};
export const login = async (req, res) => {
  res.send("hi");
};
