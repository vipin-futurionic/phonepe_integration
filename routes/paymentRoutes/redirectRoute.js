const express = require('express');
const router = express.Router();

router.get("/:merchantTransactionId", (req, res) => {
    const { merchantTransactionId } = req.params;
    console.log(merchantTransactionId);
    if (merchantTransactionId) {
        res.send(merchantTransactionId);
    } else {
        res.send("Merchant Transaction Id not found");
    }
});

module.exports = router;