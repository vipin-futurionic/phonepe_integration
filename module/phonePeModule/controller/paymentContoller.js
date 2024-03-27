const paymentService = require("../services/paymentServices");

const makePayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentUrl = await paymentService.generatePaymentUrl(amount);
    // res.redirect(paymentUrl);
    res.json({ paymentUrl: paymentUrl });
  } catch (error) {
    console.error("Error in making payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};

module.exports = {
  makePayment,
};
