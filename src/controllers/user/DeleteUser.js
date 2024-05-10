const { successResponse } = require("../../controllers/responseController");
const { deleteImage } = require("../../helper/deleteImage");
const User = require("../../models/User");

const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const options = { password: 0 };
    const user = await findById(User, id, options);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
