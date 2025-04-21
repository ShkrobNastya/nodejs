const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const {
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    stockPresence,
    reviewsPresence,
  } = req.query;

  const filter = {};

  const addRangeFilter = (field, min, max) => {
    if (min || max) {
      filter[field] = {
        ...(min ? { $gte: parseFloat(min) } : {}),
        ...(max ? { $lte: parseFloat(max) } : {}),
      };
    }
  };

  addRangeFilter("price", minPrice, maxPrice);
  addRangeFilter("rating.rate", minRating, maxRating);

  if (stockPresence === "true") {
    filter.stock = { $gt: 0 };
  }
  if (reviewsPresence === "true") {
    filter["rating.count"] = { $gt: 0 };
  }

  const products = await Product.find(filter);

  const formattedProducts = products.map((product) => {
    const productObj = product.toObject();
    productObj.id = productObj._id;
    delete productObj._id;
    return productObj;
  });

  res.json(formattedProducts);
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product doesnt exist");
    error.status = 404;
    return next(error);
  }

  res.json(product);
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    const error = new Error("Product doesnt exist");
    error.status = 404;
    return next(error);
  }

  res.json({ message: "Product was deleted", item: deletedProduct });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    const error = new Error("Product doesnt exist");
    error.status = 404;
    return next(error);
  }

  res.json(updatedProduct);
});
