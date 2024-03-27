const express = require("express");
const router = express.Router();
const paymentController = require("../../controller/paymentContoller");
const validatePayment = require("../../middleware/paymentVaildation");

router.post("/", validatePayment, paymentController.makePayment);

module.exports = router;
