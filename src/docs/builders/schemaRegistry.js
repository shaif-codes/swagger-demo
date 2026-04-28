const j2s = require("joi-to-swagger");

const createSchemaRegistry = () => {
  const schemaStore = new Map();

  const register = (name, joiSchema) => {
    if (schemaStore.has(name)) {
      throw new Error(`Duplicate schema name found: ${name}`);
    }
    const { swagger } = j2s(joiSchema);
    schemaStore.set(name, swagger);
  };

  const registerMany = (namespace, schemaDefinitions) => {
    Object.entries(schemaDefinitions).forEach(([schemaName, joiSchema]) => {
      register(`${namespace}_${schemaName}`, joiSchema);
    });
  };

  const getSchemas = () => Object.fromEntries(schemaStore.entries());

  const ref = (name) => ({ $ref: `#/components/schemas/${name}` });

  return {
    register,
    registerMany,
    getSchemas,
    ref
  };
};

module.exports = { createSchemaRegistry };
