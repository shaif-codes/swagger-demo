const { Router } = require("express");
const { validate } = require("../../../core/middlewares/validate.middleware");
const {
  listCoursesQuerySchema,
  createCourseBodySchema
} = require("./courses.validation");
const controller = require("./courses.controller");

const router = Router();

router.get("/", validate(listCoursesQuerySchema, "query"), controller.getCourses);
router.post("/", validate(createCourseBodySchema), controller.createCourse);

module.exports = router;
