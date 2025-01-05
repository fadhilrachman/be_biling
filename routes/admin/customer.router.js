const express = require("express");
const router = express.Router();
const {
  deleteCustomer,
  getCustomer,
  getCustomerDetail,
  postCustomer,
} = require("../../controller/admin/customer.controller");
const verifyToken = require("../../lib/middleware-token");

router.get("/customer", verifyToken, function (req, res, next) {
  return getCustomer({ req, res });
});

router.post("/customer", verifyToken, function (req, res, next) {
  return postCustomer({ req, res });
});

router.get("/customer/:user_id", verifyToken, function (req, res, next) {
  return getCustomerDetail({ req, res, user_id: req.params.user_id });
});

router.delete("/customer/:user_id", verifyToken, function (req, res, next) {
  return deleteCustomer({ req, res, user_id: req.params.user_id });
});

module.exports = router;
