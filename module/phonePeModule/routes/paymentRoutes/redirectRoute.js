const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/paymentRedirectController');


router.get("/:merchantTransactionId", paymentController.checkStatus);

module.exports = router;



