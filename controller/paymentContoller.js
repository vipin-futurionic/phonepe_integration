const paymentService = require('../services/paymentServices');

const makePayment = async (req, res) => {
    const { amount } = req.body;
    console.log(amount);

    // Check if the amount is a valid number
    if (!amount) {
        return res.status(400).json({ error: "Amount is required" });
    }
    if (isNaN(amount)) {
        return res.status(400).json({ error: "Invalid amount. Amount must be a number." });
    }
    console.log(amount);
    try {
        const paymentUrl = await paymentService.generatePaymentUrl(amount);
        res.redirect(paymentUrl);
        // res.json({ "paymentUrl": paymentUrl });
    } catch (error) {
        console.error("Error in making payment:", error);
        res.status(500).json({ error: "Payment failed" });
    }
};

module.exports = {
    makePayment,
};
