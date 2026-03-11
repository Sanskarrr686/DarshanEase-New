const express = require("express");
const router = express.Router();

const {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple
} = require("../controllers/templeController");

router.get("/", getTemples);

router.get("/:id", getTempleById);

router.post("/", createTemple);

router.put("/:id", updateTemple);

router.delete("/:id", deleteTemple);

module.exports = router;
