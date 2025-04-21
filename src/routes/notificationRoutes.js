const express = require("express");
const router = express.Router();
const notificatonController = require("../controllers/notificationController");

router.post("/feedbackForm", notificatonController.sendFeedbackForm);

module.exports = router;
