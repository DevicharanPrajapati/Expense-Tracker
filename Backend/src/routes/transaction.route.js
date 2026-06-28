const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const {
  createTransaction,
  showAllTransaction,
} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/addTransaction", verifyToken, createTransaction);
router.get("/showTransaction", verifyToken, showAllTransaction);

module.exports = router;
