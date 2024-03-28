const express = require("express");
const router = express.Router();
const paymentController = require("../../controller/paymentContoller");
const validatePayment = require("../../../../middleware/paymentVaildation");
const paymentSchema = require("../../validation/paymentValidation");

router.post("/", validatePayment(paymentSchema), paymentController.makePayment);

module.exports = router;
