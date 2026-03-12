const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerOrganizer,
  loginOrganizer,
  getOrganizers,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
  createTemple,
  getTemples,
  getTemplesByOrganizer,
  getTempleById,
  updateTemple,
  deleteTemple,
  createDarshan,
  getDarshans,
  getDarshansByOrganizer,
  deleteDarshan,
  getOrganizerBookings,
  deleteEvent,
} = require("../controllers/organizerController");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const allowed = /\.(jpg|jpeg|png|gif)$/i;
    if (!allowed.test(file.originalname)) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post("/osignup", registerOrganizer);
router.post("/ologin", loginOrganizer);

router.get("/organizers", getOrganizers);
router.get("/organizer/:id", getOrganizerById);
router.put("/organizeredit/:id", updateOrganizer);
router.delete("/organizerdelete/:id", deleteOrganizer);

router.post("/createtemple", upload.single("templeImage"), createTemple);
router.get("/gettemples", getTemples);
router.get("/gettemple/:organizerId", getTemplesByOrganizer);
router.get("/gettemplebyid/:id", getTempleById);
router.put("/updatetemple/:id", upload.single("templeImage"), updateTemple);
router.delete("/templedelete/:id", deleteTemple);

router.post("/createdarshan", createDarshan);
router.get("/getdarshans", getDarshans);
router.get("/getdarshans/:organizerId", getDarshansByOrganizer);
router.delete("/darshandelete/:id", deleteDarshan);
router.get("/getorganizerbookings/:organizerId", getOrganizerBookings);

router.delete("/eventdelete/:id", deleteEvent);

module.exports = router;
