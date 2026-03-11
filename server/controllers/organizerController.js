const Organizer = require("../models/Organizer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.organizerLogin = async (req, res) => {

  const { email, password } = req.body;

  const organizer = await Organizer.findOne({ email });

  if (!organizer) {
    return res.status(400).json({ message: "Organizer not found" });
  }

  const match = await bcrypt.compare(password, organizer.password);

  if (!match) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: organizer._id }, process.env.JWT_SECRET);

  res.json({ token, organizer });

};
