const express = require('express');
const {userRegistration,
  getAllRegisteredUser,
  getOneUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");


const router = express.Router();

router.post("/register", userRegistration);
router.get("/allusers", getAllRegisteredUser)
router.get("/oneUser", getOneUser)
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)

module.exports = router;