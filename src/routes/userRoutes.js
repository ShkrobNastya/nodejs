const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.getUserByEmailAndPassword);
router.post("/register", userController.createUser);
router.post("/logout", userController.logout);

module.exports = router;
