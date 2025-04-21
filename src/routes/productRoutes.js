const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/edit/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", productController.updateProduct);

module.exports = router;
