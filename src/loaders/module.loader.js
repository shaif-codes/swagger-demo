const fs = require("fs");
const path = require("path");

const walkFiles = (dirPath, matcher, collector = []) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, matcher, collector);
      return;
    }
    if (matcher(fullPath)) {
      collector.push(fullPath);
    }
  });

  return collector;
};

const loadModuleDocs = (modulesRootPath) => {
  const docFiles = walkFiles(modulesRootPath, (filePath) =>
    filePath.endsWith(".docs.js")
  );

  return docFiles.map((filePath) => {
    const loaded = require(filePath);
    const relative = path.relative(modulesRootPath, path.dirname(filePath));
    const namespace = relative.split(path.sep).join("_");
    return { namespace, ...loaded };
  });
};

module.exports = { loadModuleDocs };
