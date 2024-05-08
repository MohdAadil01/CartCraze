import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  const { username, email, password, address, phone } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return next(new Error("User already exist. Please Login to Continue."));
    }
  } catch (error) {
    return next(new Error("Error in finding the user."));
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
    return next(new Error("Error in Registering the user."));
  }
};
export const login = async (req, res) => {
  res.send("hi");
};
