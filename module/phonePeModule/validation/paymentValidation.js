const Joi = require("joi");
const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
});



module.exports = paymentSchema;
