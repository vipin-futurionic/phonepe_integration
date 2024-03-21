const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/paymentContoller');

router.get("/:amount", paymentController.makePayment);

module.exports = router;



