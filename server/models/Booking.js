const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
    organizerName: {
      type: String,
      default: "",
    },
    templeName: {
      type: String,
      default: "",
    },
    templeImage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    darshanName: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    open: {
      type: String,
      default: "",
    },
    close: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    totalamount: {
      type: Number,
      default: 0,
    },
    prices: {
      normal: {
        type: Number,
        default: 0,
      },
      vip: {
        type: Number,
        default: 0,
      },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    BookingDate: {
      type: String,
      default: () => new Date().toLocaleString(),
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "BOOKED",
      enum: ["BOOKED", "COMPLETED", "CANCELLED"],
    },
    templeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
    },
    darshanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Darshan",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
