const express = require("express");
const swaggerUi = require("swagger-ui-express");
const apiRouter = require("./routes");
const { API_PREFIX } = require("./core/constants/api.constants");
const { buildSwaggerDocument } = require("./docs/swagger");

const app = express();
const swaggerDocument = buildSwaggerDocument();

app.use(express.json());
app.use(API_PREFIX, apiRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha"
    }
  })
);

module.exports = app;
