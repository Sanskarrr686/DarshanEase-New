const express = require("express");
const router = express.Router();

const {
  getDarshanSlots,
  createDarshan,
  deleteDarshan
} = require("../controllers/darshanController");

router.get("/:templeId", getDarshanSlots);

router.post("/", createDarshan);

router.delete("/:id", deleteDarshan);

module.exports = router;
