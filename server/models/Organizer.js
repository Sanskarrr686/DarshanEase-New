const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ORGANIZER"],
      default: "ORGANIZER",
    },
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organizer", organizerSchema);
