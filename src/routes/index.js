const { Router } = require("express");
const { API_VERSION } = require("../core/constants/api.constants");
const v1Routes = require("./v1.routes");

const apiRouter = Router();

apiRouter.use(`/${API_VERSION}`, v1Routes);

module.exports = apiRouter;
