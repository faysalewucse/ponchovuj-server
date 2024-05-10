const { successResponse } = require("../responseController");
const User = require("../../models/User");
const { findById } = require("../../services/findById");

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findById(User, id, options);

    console.log(user);

    return successResponse(res, {
      statusCode: 200,
      message: "User fetched successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
