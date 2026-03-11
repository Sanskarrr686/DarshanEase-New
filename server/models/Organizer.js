const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  temple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Temple"
  }

});

module.exports = mongoose.model("Organizer", organizerSchema);
