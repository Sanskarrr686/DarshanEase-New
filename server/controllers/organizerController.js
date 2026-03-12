const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Organizer = require("../models/Organizer");
const Temple = require("../models/Temple");
const Darshan = require("../models/Darshan");
const Booking = require("../models/Booking");

const createToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const removeFile = (filename) => {
  if (!filename) return;
  const filePath = path.join(__dirname, "..", "uploads", filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Organizer.findOne({ email });
    if (existing) {
      return res.status(400).json({ Status: "Failure", message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const organizer = await Organizer.create({
      name,
      email,
      password: hashed,
    });

    const token = createToken(organizer._id, organizer.role);
    res.status(201).json({
      Status: "Success",
      user: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
        role: organizer.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ Status: "Failure", message: error.message });
  }
};

exports.loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ Status: "Failure", message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const organizer = await Organizer.findOne({ email: normalizedEmail });
    if (!organizer) {
      return res.status(400).json({ Status: "Failure", message: "Organizer not found" });
    }
    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) {
      return res.status(400).json({ Status: "Failure", message: "Invalid password" });
    }

    const token = createToken(organizer._id, organizer.role);
    res.json({
      Status: "Success",
      user: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
        role: organizer.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ Status: "Failure", message: error.message });
  }
};

exports.getOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find().select("-password");
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrganizerById = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id).select("-password");
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrganizer = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }
    const organizer = await Organizer.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.findByIdAndDelete(req.params.id);
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }
    const temples = await Temple.find({ organizerId: organizer._id });
    temples.forEach((temple) => removeFile(temple.templeImage));
    await Temple.deleteMany({ organizerId: organizer._id });
    await Darshan.deleteMany({ organizerId: organizer._id });
    await Booking.deleteMany({ organizerId: organizer._id });
    res.json({ message: "Organizer removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTemple = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Temple image is required" });
    }
    const { templeName, description, location, open, close, organizerName, organizerId } = req.body;
    const temple = await Temple.create({
      templeName,
      description,
      location,
      open,
      close,
      templeImage: req.file.filename,
      organizerId,
      organizerName,
    });
    res.status(201).json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTemples = async (req, res) => {
  try {
    const temples = await Temple.find().sort({ createdAt: -1 });
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTemplesByOrganizer = async (req, res) => {
  try {
    const temples = await Temple.find({ organizerId: req.params.organizerId }).sort({ createdAt: -1 });
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    const updates = {
      templeName: req.body.templeName,
      description: req.body.description,
      location: req.body.location,
      open: req.body.open,
      close: req.body.close,
    };

    if (req.file) {
      removeFile(temple.templeImage);
      updates.templeImage = req.file.filename;
    }

    const updated = await Temple.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }
    removeFile(temple.templeImage);
    await Darshan.deleteMany({ organizerName: temple.organizerName, templeName: temple.templeName });
    res.json({ message: "Temple deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDarshan = async (req, res) => {
  try {
    const {
      organizerId,
      organizerName,
      templeName,
      templeImage,
      location,
      darshanName,
      description,
      prices,
      open,
      close,
      slots,
    } = req.body;
    const temple = await Temple.findOne({ organizerId });
    const darshan = await Darshan.create({
      organizerId,
      organizerName,
      temple: temple?._id,
      templeName: templeName || temple?.templeName || "",
      templeImage: templeImage || temple?.templeImage || "",
      location: location || temple?.location || "",
      darshanName,
      description,
      prices: {
        normal: Number(prices?.normal) || 0,
        vip: Number(prices?.vip) || 0,
      },
      open,
      close,
      slots: Number(slots) || 0,
    });
    res.status(201).json(darshan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDarshans = async (req, res) => {
  try {
    const darshans = await Darshan.find().sort({ createdAt: -1 });
    res.json(darshans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDarshansByOrganizer = async (req, res) => {
  try {
    const darshans = await Darshan.find({ organizerId: req.params.organizerId }).sort({ createdAt: -1 });
    res.json(darshans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDarshan = async (req, res) => {
  try {
    await Darshan.findByIdAndDelete(req.params.id);
    res.json({ message: "Darshan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrganizerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ organizerId: req.params.organizerId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (temple) {
      removeFile(temple.templeImage);
      await Darshan.deleteMany({ templeName: temple.templeName });
      return res.json({ message: "Temple removed" });
    }
    const darshan = await Darshan.findByIdAndDelete(req.params.id);
    if (darshan) {
      return res.json({ message: "Darshan removed" });
    }
    res.status(404).json({ message: "Event not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
