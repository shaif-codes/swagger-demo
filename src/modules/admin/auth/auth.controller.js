const { ok } = require("../../../core/utils/apiResponse");

const login = (req, res) => {
  return res.status(200).json(
    ok("Admin login successful", {
      id: "9a6fe5e5-fd4e-4f4a-b509-6cb4a6e85145",
      email: req.body.email,
      token: "dummy-admin-jwt-token"
    })
  );
};

const signup = (req, res) => {
  return res.status(201).json(
    ok("Admin signup successful", {
      id: "cc2f3802-3d8f-4888-9438-4f07f28a39f3",
      email: req.body.email,
      token: "dummy-admin-signup-token-123"
    })
  );
};

module.exports = { login, signup };
