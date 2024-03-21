const paymentService = require('../services/paymentServices');

const makePayment = async (req, res) => {
    try {
        const paymentUrl = await paymentService.makePayment();
        res.redirect(paymentUrl);
    } catch (error) {
        console.error("Error in making payment:", error);
        res.status(500).json({ error: "Payment failed" });
    }
};

module.exports = {
    makePayment,
};
