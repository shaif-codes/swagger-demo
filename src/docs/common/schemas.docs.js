const Joi = require("joi");

const apiResponseSchema = Joi.object({
  success: Joi.boolean().required(),
  message: Joi.string().required(),
  data: Joi.any().optional(),
  meta: Joi.object().optional()
});

const errorSchema = Joi.object({
  code: Joi.string().required(),
  details: Joi.array()
    .items(
      Joi.object({
        message: Joi.string().required(),
        path: Joi.string().required()
      })
    )
    .required()
});

const paginationMetaSchema = Joi.object({
  page: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1).max(100).required(),
  totalItems: Joi.number().integer().min(0).required(),
  totalPages: Joi.number().integer().min(0).required()
});

module.exports = { apiResponseSchema, errorSchema, paginationMetaSchema };
