const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");

exports.getReviewsByProductId = asyncHandler(async (req, res) => {
  const { productId } = req.query;

  const reviews = await Review.find({ productId });
  res.json(reviews);
});
