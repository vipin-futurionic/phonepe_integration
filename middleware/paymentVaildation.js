const paymentSchema = require("../validation/paymentValidation");

const validatePayment = (req, res, next) => {
  const { error, value } = paymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedAmount = value.amount;
  next();
};

module.exports = validatePayment;
