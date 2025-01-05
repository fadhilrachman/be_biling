const express = require("express");
const router = express.Router();
const {
  getReport,
  getReportDetail,
  patchStatusReport,
} = require("../../controller/admin/report.controller");
const verifyToken = require("../../lib/middleware-token");

router.get("/report", verifyToken, function (req, res, next) {
  return getReport({ req, res });
});

router.get("/report/:report_id", verifyToken, function (req, res, next) {
  return getReportDetail({ req, res, report_id: req.params.report_id });
});

router.patch("/report/:report_id", verifyToken, function (req, res, next) {
  return deleteCategory({ req, res, report_id: req.params.report_id });
});

module.exports = router;
