const express = require("express");
const router = express.Router();
const {
  postCreateTransaction,
  getTransaction,
  deleteTransaction,
  putTransaction,
  getDetailTransaction,
} = require("../../controller/admin/transaction.controller");
const verifyToken = require("../../lib/middleware-token");

router.post("/transaction", verifyToken, function (req, res, next) {
  return postCreateTransaction({ req, res });
});

router.get("/transaction", verifyToken, function (req, res, next) {
  return getTransaction({ req, res });
});

router.get(
  "/transaction/:transaction_id",
  verifyToken,
  function (req, res, next) {
    return getDetailTransaction({
      req,
      res,
      transaction_id: req.params.transaction_id,
    });
  }
);

router.put(
  "/transaction/:transaction_id",
  verifyToken,
  function (req, res, next) {
    return putTransaction({
      req,
      res,
      transaction_id: req.params.transaction_id,
    });
  }
);

router.delete(
  "/transaction/:transaction_id",
  verifyToken,
  function (req, res, next) {
    return deleteTransaction({
      req,
      res,
      transaction_id: req.params.transaction_id,
    });
  }
);

module.exports = router;
