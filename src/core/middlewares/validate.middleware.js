const validate = (schema, source = "body") => (req, res, next) => {
  const { value, error } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
    convert: true
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: {
        code: "VALIDATION_ERROR",
        details: error.details.map((item) => ({
          message: item.message,
          path: item.path.join(".")
        }))
      }
    });
  }

  req[source] = value;
  return next();
};

module.exports = { validate };
