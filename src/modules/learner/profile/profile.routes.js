const { Router } = require("express");
const { validate } = require("../../../core/middlewares/validate.middleware");
const { updateProfileBodySchema } = require("./profile.validation");
const controller = require("./profile.controller");

const router = Router();

router.get("/", controller.getProfile);
router.put("/", validate(updateProfileBodySchema), controller.updateProfile);

module.exports = router;
