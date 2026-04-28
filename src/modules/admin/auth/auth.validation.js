const Joi = require("joi");

const loginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});

const signupBodySchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string().valid("SUPER_ADMIN", "COURSE_MANAGER").required()
});

const authPayloadSchema = Joi.object({
  id: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  token: Joi.string().required()
});

module.exports = { loginBodySchema, signupBodySchema, authPayloadSchema };
