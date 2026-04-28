const path = require("path");
const SwaggerParser = require("@apidevtools/swagger-parser");

const inputPath =
  process.argv[2] || path.join(__dirname, "..", "openapi.generated.json");

const run = async () => {
  await SwaggerParser.validate(inputPath);
  // eslint-disable-next-line no-console
  console.log(`OpenAPI validation passed: ${inputPath}`);
};

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("OpenAPI validation failed");
  // eslint-disable-next-line no-console
  console.error(error.message);
  process.exit(1);
});
