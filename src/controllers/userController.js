const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");

exports.getUserByEmailAndPassword = asyncHandler(async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const { accessToken, refreshToken } = generateToken(user._id, rememberMe);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: rememberMe ? 6 * 60 * 60 * 1000 : 5 * 60 * 60 * 1000,
    });

    res.json({
      token: accessToken,
    });
  } else {
    const error = new Error("Invalid email or password");
    error.status = 401;
    return next(error);
  }
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const { email, password, rememberMe = true } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User already exists");
    error.status = 409;
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    const rememberMe = true;
    const { accessToken, refreshToken } = generateToken(user._id, rememberMe);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: rememberMe ? 6 * 60 * 60 * 1000 : 5 * 60 * 60 * 1000,
    });

    res.status(201).json({ token: accessToken });
  } else {
    const error = new Error("Failed to create a user");
    error.status = 500;
    return next(error);
  }
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
