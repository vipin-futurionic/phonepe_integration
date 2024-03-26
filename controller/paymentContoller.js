const paymentService = require("../services/paymentServices");
const validatePayment = require("../validation/paymentValidation"); // Import the validation middleware
const makePayment = async (req, res) => {
  try {
    // Validate the amount field using the middleware
    await validatePayment(req, res, () => {});

    // Extract validated amount from request object
    const amount = req.validatedAmount;

    console.log("Amount:", amount);

    const paymentUrl = await paymentService.generatePaymentUrl(amount);
    // res.redirect(paymentUrl);
    res.json({ paymentUrl });
  } catch (error) {
    console.error("Error in making payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};

module.exports = {
  makePayment,
};
