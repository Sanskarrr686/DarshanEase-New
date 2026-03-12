const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    normal: {
      type: Number,
      default: 0,
    },
    vip: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const darshanSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
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
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    prices: {
      type: priceSchema,
      default: () => ({}),
    },
    open: {
      type: String,
      default: "",
    },
    close: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    slots: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Darshan", darshanSchema);
