const express = require('express');
const {userRegistration,
  updateProfile,
  logout,
  login,
  profile,
  updatePassword,
} = require("../controllers/user.controller");
const verifyToken = require('../middleware/auth.middleware');


const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", login)
router.get("/profile",verifyToken, profile)
router.patch("/updateProfile", verifyToken, updateProfile)
router.patch("/updatePassword", verifyToken, updatePassword)
router.post("/logout", verifyToken, logout)


module.exports = router;