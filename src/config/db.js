const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("MongoDB connect successfully");

    mongoose.connection.on("error", (err) => console.console.err(err));
  } catch (error) {
    console.log("Could not connect to DB: ", error.toString());
  }
};

module.exports = connectDB;
