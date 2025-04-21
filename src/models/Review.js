const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
