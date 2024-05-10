const jwt = require("jsonwebtoken");
const { jwtActivationKey } = require("../secret");

const createJSONWebToken = (
  payload,
  secretKey = jwtActivationKey,
  expiresIn = "10m"
) => {
  try {
    if (typeof payload !== "object" || !payload) {
      throw new Error("Payload must be a non-empty object");
    }

    const token = jwt.sign(payload, secretKey, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error("Failed to sign the JWT", error);
    throw error;
  }
};

module.exports = { createJSONWebToken };
