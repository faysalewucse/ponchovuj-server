const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { successResponse } = require("../responseController");
const { createJSONWebToken } = require("../../helper/jsonwebtoken");
const sendEmailWithNodemailer = require("../../helper/email");
const { jwtActivationKey } = require("../../secret");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, image } = req.body;

    const userExists = await User.exists({ email: email });

    if (userExists) {
      throw createHttpError(
        409,
        "User with this email already exists, Please sign in"
      );
    }

    const newUser = {
      name,
      email,
      password,
      phone,
      address,
    };

    const token = createJSONWebToken(newUser);

    const emailData = {
      email: newUser.email,
      subject: "Account Activation Email",
      html: `
        <h1>Hello ${newUser.name}</h1>
        <h1>Welcome to Ponchovuj</h1>
        <p>Please click on the link below to activate your account</p>
        <a href="${process.env.CLIENT_URL}/api/v1/users/activate/${token}" target="_blank">Activate</a>
      `,
    };

    try {
      await sendEmailWithNodemailer(emailData);
    } catch (emailError) {
      next(createHttpError(500, "Failed to send verification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your email ${email} for completing your registration process`,
      payload: {
        newUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      throw createHttpError(404, "Please provide a token");
    }
    try {
      const decoded = jwt.verify(token, jwtActivationKey);

      if (!decoded) {
        throw createHttpError(404, "User was unable to verified");
      }

      const userExists = await User.exists({ email: decoded.email });

      if (userExists) {
        throw createHttpError(
          409,
          "User with this email already exists, Please sign in"
        );
      }

      const user = await User.create(decoded);

      return successResponse(res, {
        statusCode: 201,
        message: `User registered successfully`,
        payload: {
          user,
        },
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createHttpError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createHttpError(401, "Invalid token");
      } else throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, verifyUser };
