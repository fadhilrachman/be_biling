const express = require("express");
const router = express.Router();
const routerAdmin = require("./admin.router");
const routerAuthn = require("./auth.router");
const routerCategory = require("./category.router");
const routerCustomer = require("./customer.router");
const routerProduct = require("./product.router");
const routerReport = require("./report.router");

router.use("/api/admin", routerAdmin);
router.use("/api/admin", routerAuthn);
router.use("/api/admin", routerCategory);
router.use("/api/admin", routerCustomer);
router.use("/api/admin", routerProduct);
router.use("/api/admin", routerReport);

module.exports = router;
