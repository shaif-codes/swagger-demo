const {
  updateProfileBodySchema,
  profilePayloadSchema
} = require("./profile.validation");

const schemaDefs = {
  UpdateProfileRequest: updateProfileBodySchema,
  ProfilePayload: profilePayloadSchema
};

const getDocs = ({ ref }) => ({
  paths: {
    "/learner/profile": {
      get: {
        tags: ["11 Learner / Profile"],
        summary: "Get learner profile",
        operationId: "learner.profile.get",
        responses: {
          200: {
            description: "Profile fetched",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    ref("ApiResponse"),
                    {
                      type: "object",
                      properties: {
                        data: ref("learner_profile_ProfilePayload")
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      put: {
        tags: ["11 Learner / Profile"],
        summary: "Update learner profile",
        operationId: "learner.profile.update",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: ref("learner_profile_UpdateProfileRequest")
            }
          }
        },
        responses: {
          200: {
            description: "Profile updated",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    ref("ApiResponse"),
                    {
                      type: "object",
                      properties: {
                        data: ref("learner_profile_ProfilePayload")
                      }
                    }
                  ]
                }
              }
            }
          },
          400: { $ref: "#/components/responses/BadRequest" }
        }
      }
    }
  }
});

module.exports = { schemaDefs, getDocs };
