const createHttpError = require("http-errors");
const cloudinary = require("../../config/cloudinary");
const User = require("../../models/User");
const { projectName } = require("../../secret");
const { findById } = require("../../services/findById");
const { successResponse } = require("../responseController");

const uploadUserImage = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const filePath = req.file.path;
    const updateOptions = { new: true, runValidators: true, context: "query" };

    await findById(User, userId);

    const response = await cloudinary.uploader.upload(filePath, {
      folder: `${projectName}`,
    });

    const imageUrl = response.secure_url;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      updateOptions
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User image updated successfully",
      payload: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadUserImage;
