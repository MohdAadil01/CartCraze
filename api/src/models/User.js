import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  phone: { type: String },
  profile: {
    type: String,
    default:
      "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
  },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

export default User;
