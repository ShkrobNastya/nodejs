const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
