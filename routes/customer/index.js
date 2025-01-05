const express = require("express");
const router = express.Router();

const routerAuth = require("./auth.router");
const routerReport = require("./report.router");

router.use("/api/customer", routerAuth);
router.use("/api/customer", routerReport);

module.exports = router;
