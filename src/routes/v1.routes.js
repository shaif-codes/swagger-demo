const { Router } = require("express");
const adminAuthRoutes = require("../modules/admin/auth/auth.routes");
const adminCoursesRoutes = require("../modules/admin/courses/courses.routes");
const learnerProfileRoutes = require("../modules/learner/profile/profile.routes");

const v1Router = Router();

v1Router.use("/admin/auth", adminAuthRoutes);
v1Router.use("/admin/courses", adminCoursesRoutes);
v1Router.use("/learner/profile", learnerProfileRoutes);

module.exports = v1Router;
