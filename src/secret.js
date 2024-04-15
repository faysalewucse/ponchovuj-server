require("dotenv").config();
const port = process.env.PORT || 5002;
const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017";

const defaultImagePath =
  process.env.USER_DEFAULT_IMAGE_PATH || "public/images/users/person.png";

module.exports = { port, mongodbURL, defaultImagePath };
