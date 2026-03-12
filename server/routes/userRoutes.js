const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  deleteBooking,
} = require("../controllers/bookingController");
const { getDarshanDetails } = require("../controllers/darshanController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/useredit/:id", updateUser);
router.delete("/userdelete/:id", deleteUser);

router.post("/userbooking", createBooking);
router.get("/getbookings", getAllBookings);
router.get("/getbookings/:userId", getUserBookings);
router.delete("/userbookingdelete/:id", deleteBooking);

router.get("/darshan/:id", getDarshanDetails);

module.exports = router;
