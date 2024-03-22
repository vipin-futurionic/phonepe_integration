const paymentService = require('../services/paymentServices');

const checkStatus = async (req, res) => {
    const { merchantTransactionId } = req.params;
    try {
        const paymentStatus = await paymentService.checkPaymentStatus(
            merchantTransactionId,
        );
        console.log(paymentStatus);
        res.send(paymentStatus);
    } catch (error) {
        console.error("Error in checking payment status:", error);
        res.status(500).json({ error: "Payment status check failed" });
    }
}

module.exports = {
    checkStatus,
}
