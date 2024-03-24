require("dotenv").config();
const port = process.env.PORT || 5002;
const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017";

module.exports = { port, mongodbURL };
