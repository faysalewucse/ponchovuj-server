const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultImagePath } = require("../secret");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 2 characters long"],
      maxlength: [31, "Full name cannot exceed 31 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [3, "Address must be at least 3 characters long"],
    },
    role: {
      type: String,
      default: "consumer",
    },
    phone: {
      type: String,
      required: true,
    },
    couponCode: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
