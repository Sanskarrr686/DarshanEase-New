const express = require("express");
const router = express.Router();
const { registerAdmin, adminLogin } = require("../controllers/adminController");

router.post("/asignup", registerAdmin);
router.post("/alogin", adminLogin);

module.exports = router;
