const {
  loginBodySchema,
  signupBodySchema,
  authPayloadSchema,
  logoutBodySchema
} = require("./auth.validation");

const schemaDefs = {
  LoginRequest: loginBodySchema,
  SignupRequest: signupBodySchema,
  AuthPayload: authPayloadSchema,
  LogoutRequest: logoutBodySchema
};

const getDocs = ({ ref }) => ({
  paths: {
    "/admin/auth/login": {
      post: {
        tags: ["01 Admin / Auth"],
        summary: "Login admin",
        operationId: "admin.auth.login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: ref("admin_auth_LoginRequest")
            }
          }
        },
        responses: {
          200: {
            description: "Login success",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    ref("ApiResponse"),
                    {
                      type: "object",
                      properties: {
                        data: ref("admin_auth_AuthPayload")
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
    },
    "/admin/auth/signup": {
      post: {
        tags: ["01 Admin / Auth"],
        summary: "Signup admin",
        operationId: "admin.auth.signup",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: ref("admin_auth_SignupRequest")
            }
          }
        },
        responses: {
          201: {
            description: "Signup success",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    ref("ApiResponse"),
                    {
                      type: "object",
                      properties: {
                        data: ref("admin_auth_AuthPayload")
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
    },
    "/admin/auth/logout": {
      post: {
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: ref("admin_auth_LogoutRequest")
            }
          }
        },
        tags: ["01 Admin / Auth"],
        summary: "Logout admin",
        operationId: "admin.auth.logout",
        responses: {
          200: { $ref: "#/components/responses/Success" },
          400: { $ref: "#/components/responses/BadRequest" }
        }
      }
    }
  }
});

module.exports = { schemaDefs, getDocs };
