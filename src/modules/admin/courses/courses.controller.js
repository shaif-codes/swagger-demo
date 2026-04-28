const { ok } = require("../../../core/utils/apiResponse");

const getCourses = (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);

  return res.status(200).json(
    ok(
      "Courses fetched",
      [
        {
          id: "1309b31d-4f4e-405d-a2e3-ec6871ca5fd8",
          title: "Node.js Architecture",
          price: 99,
          isPublished: true
        }
      ],
      {
        page,
        limit,
        totalItems: 1,
        totalPages: 1
      }
    )
  );
};

const createCourse = (req, res) => {
  return res.status(201).json(
    ok("Course created", {
      id: "bc9729aa-744a-4dc8-ad3a-0b6437fa5f31",
      title: req.body.title,
      price: req.body.price,
      isPublished: req.body.isPublished ?? false
    })
  );
};

module.exports = { getCourses, createCourse };
