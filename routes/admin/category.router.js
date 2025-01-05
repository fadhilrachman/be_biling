const express = require("express");
const router = express.Router();
const {
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../../controller/admin/category.controller");
const verifyToken = require("../../lib/middleware-token");

router.get("/category", verifyToken, function (req, res, next) {
  return getCategory({ req, res });
});

router.post("/category", verifyToken, function (req, res, next) {
  return postCategory({ req, res });
});

router.put("/category/:category_id", verifyToken, function (req, res, next) {
  return putCategory({ req, res, category_id: req.params.category_id });
});

router.delete("/category/:category_id", verifyToken, function (req, res, next) {
  return deleteCategory({ req, res, category_id: req.params.category_id });
});

module.exports = router;
