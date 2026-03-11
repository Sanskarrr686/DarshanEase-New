const express = require("express");
const router = express.Router();

const { organizerLogin } = require("../controllers/organizerController");

router.post("/login", organizerLogin);

module.exports = router;
