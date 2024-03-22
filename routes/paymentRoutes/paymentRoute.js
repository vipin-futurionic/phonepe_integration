const express = require("express");
const router = express.Router();
const paymentController = require("../../controller/paymentContoller");

router.post("/", paymentController.makePayment);

module.exports = router;
