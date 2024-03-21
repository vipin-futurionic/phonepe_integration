const paymentService = require('../services/paymentServices');

const makePayment = async (req, res) => {
    const { amount } = req.params;

    // Check if the amount is a valid number
    if (isNaN(amount)) {
        return res.status(400).json({ error: "Invalid amount. Amount must be a number." });
    }
    console.log(amount);
    try {
        const paymentUrl = await paymentService.generatePaymentUrl(amount);
        res.redirect(paymentUrl);
    } catch (error) {
        console.error("Error in making payment:", error);
        res.status(500).json({ error: "Payment failed" });
    }
};

module.exports = {
    makePayment,
};
