const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/addCategory", verifyToken, createCategory);
router.get("/getCategory", verifyToken, getCategories);
router.put("/updateCategory", verifyToken, updateCategory);
router.delete("/deleteCategory", verifyToken, deleteCategory);




module.exports = router;
