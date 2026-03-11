const Booking = require("../models/Booking");
const QRCode = require("qrcode");

exports.createBooking = async (req, res) => {

  const booking = await Booking.create(req.body);

  const qrData = await QRCode.toDataURL(
    `BookingID:${booking._id}`
  );

  res.json({
    booking,
    qr: qrData
  });

};

exports.getUserBookings = async (req, res) => {

  const bookings = await Booking.find({ user: req.params.userId })
    .populate("temple")
    .populate("darshan");

  res.json(bookings);

};

exports.getAllBookings = async (req, res) => {

  const bookings = await Booking.find()
    .populate("temple")
    .populate("darshan")
    .populate("user");

  res.json(bookings);

};
