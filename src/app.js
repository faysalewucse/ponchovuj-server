const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const userRouter = require("./routers/userRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minute).
  message: "Too many requests from this IP. please try again later.",
});

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/users", userRouter);

// Client error handler
app.use((err, req, res, next) => {
  next(createError(400, err));
});

// Server Error handler
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
