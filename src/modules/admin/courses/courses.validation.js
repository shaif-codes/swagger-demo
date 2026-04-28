const Joi = require("joi");

const listCoursesQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().allow("").optional()
});

const createCourseBodySchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().max(1000).required(),
  price: Joi.number().min(0).required(),
  isPublished: Joi.boolean().default(false)
});

const courseItemSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  isPublished: Joi.boolean().required()
});

module.exports = {
  listCoursesQuerySchema,
  createCourseBodySchema,
  courseItemSchema
};
