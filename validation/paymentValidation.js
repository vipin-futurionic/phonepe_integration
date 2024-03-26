const Joi = require("joi");

const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

const validatePayment = (req, res, next) => {
  const { error, value } = paymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedAmount = value.amount; // Store validated amount in request object
  next();
};

module.exports = validatePayment;
