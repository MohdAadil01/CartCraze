import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import User from "../models/User.js";
import { generateToken } from "../middlewares/jwt.js";

export const register = async (req, res, next) => {
  const { username, email, password, address, phone } = req.body;
  if (!username || !email || !password || !address || !phone) {
    return next(createHttpError(400, "Please Enter all fields."));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  const phoneRegex = /^\d{10}$/;

  if (username.length < 3 || username.length > 30) {
    return next(
      createHttpError(
        400,
        "Username must be in between 3 and 30 characters long."
      )
    );
  }

  if (!emailRegex.test(email)) {
    return next(createHttpError(400, "Please Enter a valid email address."));
  }

  if (!passwordRegex.test(password)) {
    return next(
      createHttpError(
        400,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
    );
  }

  if (address.length < 5 || address.length > 100) {
    return next(
      createHttpError(400, "Address must be between 5 and 100 characters long.")
    );
  }

  if (!phoneRegex.test(phone)) {
    return next(
      createHttpError(400, "Please provide a valid 10-digit phone number.")
    );
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return next(
        createHttpError(400, "User already exists. Please Login to continue.")
      );
    }
  } catch (error) {
    console.log(error);
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

    const token = generateToken(email);
    res.cookie("token", token);

    res.status(200).json({
      message: "Successfully Registered.",
      user: newUser,
      cookie: token,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error in Registering the user."));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "Please Enter all fields."));
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(
        createHttpError(400, "No user found. Please register first.")
      );
    }

    const isPasswordSame = bcrypt.compareSync(password, foundUser.password);

    if (!isPasswordSame) {
      return next(createHttpError(400, "Invalid Credentials"));
    }

    let token = generateToken(foundUser.email);
    res.cookie("token", token);
    res.status(200).json({
      message: "Successfully Logged In",
      user: foundUser,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "Error in Login in."));
  }
};
