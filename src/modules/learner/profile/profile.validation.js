const Joi = require("joi");

const updateProfileBodySchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  bio: Joi.string().max(500).allow("").optional(),
  timezone: Joi.string().required()
});

const profilePayloadSchema = Joi.object({
  id: Joi.string().uuid().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  bio: Joi.string().allow("").optional(),
  timezone: Joi.string().required()
});

module.exports = { updateProfileBodySchema, profilePayloadSchema };
