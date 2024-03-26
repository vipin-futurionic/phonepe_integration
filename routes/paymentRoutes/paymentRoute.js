const express = require("express");
const router = express.Router();
const paymentController = require("../../controller/paymentContoller");
const validatePayment = require("../../validation/paymentValidation");

router.post("/", validatePayment, paymentController.makePayment);

module.exports = router;
