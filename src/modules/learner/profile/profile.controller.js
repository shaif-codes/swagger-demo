const { ok } = require("../../../core/utils/apiResponse");

const getProfile = (_req, res) => {
  return res.status(200).json(
    ok("Profile fetched", {
      id: "2e6114d8-5bca-49f3-8bc8-48b3605381bc",
      fullName: "Demo Learner",
      email: "learner@example.com",
      bio: "Dummy profile for API contract testing",
      timezone: "UTC"
    })
  );
};

const updateProfile = (req, res) => {
  return res.status(200).json(
    ok("Profile updated", {
      id: "2e6114d8-5bca-49f3-8bc8-48b3605381bc",
      fullName: req.body.fullName,
      email: "learner@example.com",
      bio: req.body.bio || "",
      timezone: req.body.timezone
    })
  );
};

module.exports = { getProfile, updateProfile };
