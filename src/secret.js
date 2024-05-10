require("dotenv").config();

const projectName = process.env.PROJECT_NAME || "Untitled";
const port = process.env.PORT || 5002;
const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017";

const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "781C13ADF1668C5B47F4FA9BB924F";

const defaultImagePath =
  process.env.USER_DEFAULT_IMAGE_PATH || "public/images/users/person.png";

const smtpUserName = process.env.SMTP_USER_NAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL || "";

module.exports = {
  port,
  projectName,
  mongodbURL,
  defaultImagePath,
  jwtActivationKey,
  smtpUserName,
  smtpPassword,
  clientUrl,
};
