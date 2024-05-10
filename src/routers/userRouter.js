const express = require("express");
const getUsers = require("../controllers/user/GetUsers");
const getUser = require("../controllers/user/GetUser");
const deleteUser = require("../controllers/user/DeleteUser");
const upload = require("../middlewares/uploadFile");
const { validateUserRegistration } = require("../validators/auth_validator");
const runValidation = require("../validators");
const updateUser = require("../controllers/user/UpdateUser");
const { createUser, verifyUser } = require("../controllers/user/CreateUser");
const uploadUserImage = require("../controllers/image/UploadImage");
const userRouter = express.Router();

userRouter.post(
  "/register",
  validateUserRegistration,
  runValidation,
  createUser
);

userRouter.post("/verify", verifyUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);
userRouter.post("/uploadImage/:id", upload.single("image"), uploadUserImage);

module.exports = userRouter;
