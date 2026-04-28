const {
  listCoursesQuerySchema,
  createCourseBodySchema,
  courseItemSchema
} = require("./courses.validation");

const schemaDefs = {
  ListCoursesQuery: listCoursesQuerySchema,
  CreateCourseRequest: createCourseBodySchema,
  CourseItem: courseItemSchema
};

const getDocs = ({ ref }) => ({
  paths: {
    "/admin/courses": {
      get: {
        tags: ["02 Admin / Courses"],
        summary: "List courses",
        operationId: "admin.courses.list",
        parameters: [
          { in: "query", name: "page", schema: { type: "integer", minimum: 1 } },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", minimum: 1, maximum: 100 }
          },
          { in: "query", name: "search", schema: { type: "string" } }
        ],
        responses: {
          200: {
            description: "Courses fetched",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    ref("ApiResponse"),
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: ref("admin_courses_CourseItem")
                        },
                        meta: ref("PaginationMeta")
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["02 Admin / Courses"],
        summary: "Create course",
        operationId: "admin.courses.create",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: ref("admin_courses_CreateCourseRequest")
            }
          }
        },
        responses: {
          201: {
            description: "Course created",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    ref("ApiResponse"),
                    {
                      type: "object",
                      properties: {
                        data: ref("admin_courses_CourseItem")
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
