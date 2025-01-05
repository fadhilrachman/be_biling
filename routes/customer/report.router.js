const express = require("express");
const router = express.Router();
const {
  deleteReport,
  getReport,
  getReportDetail,
  postReport,
  putReport,
} = require("../../controller/customer/report.controller");
const verifyTokenCustomer = require("../../lib/middleware-token-customer");

router.get("/report", verifyTokenCustomer, function (req, res, next) {
  return getReport({ req, res, user_id: req.user.id });
});

router.post("/report", verifyTokenCustomer, function (req, res, next) {
  return postReport({ req, res, user_id: req.user.id });
});

router.get(
  "/report/:report_id",
  verifyTokenCustomer,
  function (req, res, next) {
    return getReportDetail({ req, res, report_id: req.params.report_id });
  }
);

router.put(
  "/report/:report_id",
  verifyTokenCustomer,
  function (req, res, next) {
    return putReport({ req, res, report_id: req.params.report_id });
  }
);

router.delete(
  "/report/:report_id",
  verifyTokenCustomer,
  function (req, res, next) {
    return deleteReport({ req, res, report_id: req.params.report_id });
  }
);

module.exports = router;
