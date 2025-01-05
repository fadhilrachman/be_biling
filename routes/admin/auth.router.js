const express = require("express");
const router = express.Router();
const { postLogin } = require("../../controller/admin/auth.controller");

router.post("/login", function (req, res, next) {
  return postLogin({ req, res });
});

module.exports = router;
