const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    code: err.status,
  });
};

module.exports = errorMiddleware;
