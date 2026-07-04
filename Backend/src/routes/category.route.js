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
router.get("/getCategory",verifyToken, getCategories);
router.patch("/updateCategory/:id", verifyToken, updateCategory);
router.delete("/deleteCategory/:id", verifyToken, deleteCategory);




module.exports = router;
