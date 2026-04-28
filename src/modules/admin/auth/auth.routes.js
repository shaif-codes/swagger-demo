const { Router } = require("express");
const { validate } = require("../../../core/middlewares/validate.middleware");
const {
  loginBodySchema,
  signupBodySchema
} = require("./auth.validation");
const controller = require("./auth.controller");

const router = Router();

router.post("/login", validate(loginBodySchema), controller.login);
router.post("/signup", validate(signupBodySchema), controller.signup);

module.exports = router;
