const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    const error = new Error("No refresh token provided");
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2m" },
    );
    res.json({ token: accessToken });
  } catch (err) {
    const error = new Error("Invalid refresh token");
    error.status = 401;
    return next(error);
  }
});
