const express = require("express");
const { getUsers } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/profile", (req, res) => {
  res.send("User profile returned");
});

module.exports = userRouter;
