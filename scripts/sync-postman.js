const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Converter = require("openapi-to-postmanv2");

dotenv.config({ path: path.join(__dirname, "..", ".env"), quiet: true });
dotenv.config({ quiet: true });

const openApiPath =
  process.argv[2] || path.join(__dirname, "..", "openapi.generated.json");

const {
  POSTMAN_API_KEY,
  POSTMAN_COLLECTION_UID,
  POSTMAN_WORKSPACE_ID,
  POSTMAN_COLLECTION_NAME,
  POSTMAN_FOLDER_STRATEGY
} = process.env;

if (!POSTMAN_API_KEY) {
  // eslint-disable-next-line no-console
  console.error("Missing POSTMAN_API_KEY in environment.");
  process.exit(1);
}

const convertOpenApiToCollection = (openApiString) =>
  new Promise((resolve, reject) => {
    const folderStrategy = POSTMAN_FOLDER_STRATEGY || "Paths";

    Converter.convert(
      { type: "json", data: openApiString },
      {
        folderStrategy,
        requestNameSource: "summary",
        includeAuthInfoInExample: false
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result.result || !result.output?.[0]?.data) {
          return reject(new Error("Failed to convert OpenAPI to Postman"));
        }
        return resolve(result.output[0].data);
      }
    );
  });

const postmanRequest = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: {
      "X-Api-Key": POSTMAN_API_KEY,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Postman API error (${response.status}): ${JSON.stringify(payload)}`
    );
  }
  return payload;
};

const findCollectionUidByName = async (workspaceId, collectionName) => {
  const encodedWorkspaceId = encodeURIComponent(workspaceId);
  const url = `https://api.getpostman.com/collections?workspace=${encodedWorkspaceId}`;
  const payload = await postmanRequest(url, "GET");
  const collections = payload.collections || [];
  const matched = collections.find((item) => item.name === collectionName);
  return matched?.uid;
};

const run = async () => {
  const openApiString = fs.readFileSync(openApiPath, "utf-8");
  const convertedCollection = await convertOpenApiToCollection(openApiString);

  if (POSTMAN_COLLECTION_NAME) {
    convertedCollection.info.name = POSTMAN_COLLECTION_NAME;
  }

  if (POSTMAN_COLLECTION_UID) {
    const url = `https://api.getpostman.com/collections/${POSTMAN_COLLECTION_UID}`;
    await postmanRequest(url, "PUT", { collection: convertedCollection });
    // eslint-disable-next-line no-console
    console.log(`Updated Postman collection: ${POSTMAN_COLLECTION_UID}`);
    return;
  }

  if (!POSTMAN_WORKSPACE_ID) {
    throw new Error(
      "Missing POSTMAN_WORKSPACE_ID. Required when POSTMAN_COLLECTION_UID is not set."
    );
  }

  if (POSTMAN_COLLECTION_NAME) {
    const existingUid = await findCollectionUidByName(
      POSTMAN_WORKSPACE_ID,
      POSTMAN_COLLECTION_NAME
    );

    if (existingUid) {
      const updateUrl = `https://api.getpostman.com/collections/${existingUid}`;
      await postmanRequest(updateUrl, "PUT", { collection: convertedCollection });
      // eslint-disable-next-line no-console
      console.log(`Updated Postman collection by name: ${existingUid}`);
      return;
    }
  }

  const createUrl = `https://api.getpostman.com/collections?workspace=${POSTMAN_WORKSPACE_ID}`;
  const created = await postmanRequest(createUrl, "POST", {
    collection: convertedCollection
  });
  // eslint-disable-next-line no-console
  console.log(
    `Created Postman collection: ${created.collection?.uid || "unknown uid"}`
  );
};

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Postman sync failed");
  // eslint-disable-next-line no-console
  console.error(error.message);
  process.exit(1);
});
