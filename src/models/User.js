const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImagePath } = require("../secret");

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
      required: true,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultImagePath,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "consumer",
    },
    isBanner: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    couponCode: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
