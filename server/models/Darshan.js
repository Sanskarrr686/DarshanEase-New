const mongoose = require("mongoose");

const darshanSchema = new mongoose.Schema({

  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Temple",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  slots: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Darshan", darshanSchema);
