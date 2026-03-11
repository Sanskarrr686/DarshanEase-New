const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Temple"
  },

  darshan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Darshan"
  },

  tickets: Number,

  price: Number,

  bookingDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Booking", bookingSchema);
