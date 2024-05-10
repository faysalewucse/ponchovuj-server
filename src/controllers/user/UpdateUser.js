const { successResponse } = require("../../controllers/responseController");
const User = require("../../models/User");

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateOptions = { new: true, runValidators: true, context: "query" };

    let updates = {};

    for (let key in req.body) {
      if (["name", "password", "phone", "address"].includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
