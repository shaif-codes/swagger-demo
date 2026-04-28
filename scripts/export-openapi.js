const fs = require("fs");
const path = require("path");
const { buildSwaggerDocument } = require("../src/docs/swagger");

const outputPath =
  process.argv[2] || path.join(__dirname, "..", "openapi.generated.json");

const document = buildSwaggerDocument();
fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), "utf-8");

// eslint-disable-next-line no-console
console.log(`OpenAPI exported to ${outputPath}`);
