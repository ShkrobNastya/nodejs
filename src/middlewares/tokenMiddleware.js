const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const tokenMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch (err) {
      const error = new Error("Not authorized, token failed");
      error.status = 401;
      return next(error);
    }
  } else {
    const error = new Error("Not authorized, no token");
    error.status = 401;
    return next(error);
  }
});

module.exports = tokenMiddleware;
