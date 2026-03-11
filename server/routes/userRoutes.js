const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/profile/:id", updateProfile);

module.exports = router;
