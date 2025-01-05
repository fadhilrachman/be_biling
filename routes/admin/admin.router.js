const express = require("express");
const router = express.Router();
const {
  deleteAdmin,
  getAdmin,
  getAdminDetail,
  postAdmin,
} = require("../../controller/admin/admin.controller");
const verifyToken = require("../../lib/middleware-token");

router.get("/admin", verifyToken, function (req, res, next) {
  return getAdmin({ req, res });
});

router.post("/admin", function (req, res, next) {
  return postAdmin({ req, res });
});

router.get("/admin/:user_id", verifyToken, function (req, res, next) {
  return getAdminDetail({ req, res, user_id: req.params.user_id });
});

router.delete("/admin/:user_id", verifyToken, function (req, res, next) {
  return deleteAdmin({ req, res, user_id: req.params.user_id });
});

module.exports = router;
