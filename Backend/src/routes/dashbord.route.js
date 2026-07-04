const express = require("express");
const verifyToken  = require("../middleware/auth.middleware.js");
const { getDashboardData } = require("../controllers/dashboard.controller.js");

const router = express.Router();

router.get("/dashboard", verifyToken, getDashboardData);

module.exports = router;