import mongoose from "mongoose";
import config from "./config.js";

export const connectDb = async () => {
  try {
    const res = await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
