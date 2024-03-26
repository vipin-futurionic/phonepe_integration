const Joi = require("joi");

// Define Joi schema for validation
const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

// Middleware function to validate the amount field
const validatePayment = (req, res, next) => {
  const { error, value } = paymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Store validated amount in request object
  req.validatedAmount = value.amount;
  next(); // Call next middleware
};

module.exports = validatePayment;
