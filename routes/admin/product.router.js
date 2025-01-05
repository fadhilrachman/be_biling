const express = require("express");
const router = express.Router();
const {
  deleteProduct,
  getProduct,
  getProductDetail,
  postProduct,
  putProduct,
} = require("../../controller/admin/product.controller");
const verifyToken = require("../../lib/middleware-token");

router.get("/product", verifyToken, function (req, res, next) {
  return getProduct({ req, res });
});

router.post("/product", verifyToken, function (req, res, next) {
  return postProduct({ req, res });
});

router.get("/product/:product_id", verifyToken, function (req, res, next) {
  return getProductDetail({ req, res, product_id: req.params.product_id });
});

router.put("/product/:product_id", verifyToken, function (req, res, next) {
  return putProduct({ req, res, product_id: req.params.product_id });
});

router.delete("/product/:product_id", verifyToken, function (req, res, next) {
  return deleteProduct({ req, res, product_id: req.params.product_id });
});

module.exports = router;
