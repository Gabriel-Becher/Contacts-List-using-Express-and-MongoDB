const Joi = require("joi");

exports.userValidator = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(8).required(),
});
