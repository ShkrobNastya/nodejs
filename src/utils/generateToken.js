const jwt = require("jsonwebtoken");

const generateToken = (id, rememberMe) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2m",
  });
  const refreshTokenExpiry = rememberMe ? "6h" : "5h";
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: refreshTokenExpiry,
  });
  return { accessToken, refreshToken };
};

module.exports = generateToken;
