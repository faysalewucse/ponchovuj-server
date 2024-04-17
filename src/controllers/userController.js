const createHttpError = require("http-errors");
const User = require("../models/User");
const { successResponse } = require("./responseController");
const { findById } = require("../services/findById");
const fs = require("fs");

const getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegExp = new RegExp(".*" + search, ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users) {
      throw createHttpError(404, "No users found!");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Users fetched successfully",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const options = { password: 0 };
    const user = await findById(User, id, options);

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

const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const options = { password: 0 };
    const user = await findById(User, id, options);

    const userImagePath = deletedUser.image;
    fs.access(userImagePath, (err) => {
      if (err) {
        console.error("User image does not exist");
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) {
            throw err;
          }

          console.log("User image deleted successfully");
        });
      }
    });

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

module.exports = { getUsers, getUser };
