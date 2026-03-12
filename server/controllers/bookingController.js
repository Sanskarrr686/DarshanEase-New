const Booking = require("../models/Booking");
const Darshan = require("../models/Darshan");

exports.createBooking = async (req, res) => {
  try {
    const now = req.body.bookingDate ? new Date(req.body.bookingDate) : new Date();
    const quantity = Number(req.body.quantity) || 1;
    const darshanId = req.body.darshanId;
    const darshan = await Darshan.findById(darshanId);
    if (!darshan) {
      return res.status(404).json({ message: "Darshan slot not found" });
    }

    const availableSlots =
      typeof darshan.slots === "number" ? darshan.slots : Number.MAX_SAFE_INTEGER;
    if (availableSlots < quantity) {
      return res.status(400).json({ message: "Not enough slots available" });
    }

    if (typeof darshan.slots === "number") {
      darshan.slots = availableSlots - quantity;
      await darshan.save();
    }

    const bookingData = {
      userId: req.body.userId,
      userName: req.body.userName || req.body.name,
      userEmail: req.body.userEmail || req.body.email,
      email: req.body.email || req.body.userEmail,
      organizerId: req.body.organizerId,
      organizerName: req.body.organizerName,
      templeName: req.body.templeName,
      templeImage: req.body.templeImage,
      location: req.body.location,
      darshanName: req.body.darshanName,
      description: req.body.description,
      open: req.body.open,
      close: req.body.close,
      quantity,
      totalamount: Number(req.body.totalamount) || 0,
      prices: {
        normal: Number(req.body.prices?.normal) || 0,
        vip: Number(req.body.prices?.vip) || 0,
      },
      bookingDate: now,
      BookingDate: req.body.BookingDate || now.toLocaleString(),
      date: req.body.date ? new Date(req.body.date) : now,
      templeId: req.body.templeId,
      darshanId,
    };
    const booking = await Booking.create(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const filter = req.params.userId ? { userId: req.params.userId } : {};
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
