const path = require("path");
const { createSchemaRegistry } = require("./builders/schemaRegistry");
const { loadModuleDocs } = require("../loaders/module.loader");
const {
  apiResponseSchema,
  errorSchema,
  paginationMetaSchema
} = require("./common/schemas.docs");
const { tags } = require("./common/tags");

const buildSwaggerDocument = () => {
  const registry = createSchemaRegistry();
  const modulesRootPath = path.join(__dirname, "..", "modules");
  const moduleDocs = loadModuleDocs(modulesRootPath);

  registry.register("ApiResponse", apiResponseSchema);
  registry.register("Error", errorSchema);
  registry.register("PaginationMeta", paginationMetaSchema);

  const paths = {};
  moduleDocs.forEach((moduleDoc) => {
    registry.registerMany(moduleDoc.namespace, moduleDoc.schemaDefs || {});
    const built = moduleDoc.getDocs({ ref: registry.ref });
    Object.assign(paths, built.paths || {});
  });

  return {
    openapi: "3.0.3",
    info: {
      title: "Modular SaaS API",
      version: "1.0.0",
      description: "Production-grade modular Express API with Joi-backed OpenAPI."
    },
    servers: [{ url: "/api/v1", description: "Version 1" }],
    tags,
    paths,
    components: {
      schemas: registry.getSchemas(),
      responses: {
        BadRequest: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/ApiResponse" },
                  {
                    type: "object",
                    properties: {
                      error: { $ref: "#/components/schemas/Error" }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  };
};

module.exports = { buildSwaggerDocument };
