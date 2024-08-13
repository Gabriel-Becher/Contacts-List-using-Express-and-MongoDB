const Joi = require("joi");

exports.emailValidator = Joi.object({
  email: Joi.string().email().required(),
});
