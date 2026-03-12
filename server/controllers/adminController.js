const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const createToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ Status: "Failure", message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      email,
      password: hashed,
    });

    const token = createToken(admin._id, admin.role);

    res.status(201).json({
      Status: "Success",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ Status: "Failure", message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ Status: "Failure", message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ Status: "Failure", message: "Invalid password" });
    }

    const token = createToken(admin._id, admin.role);
    res.json({
      Status: "Success",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ Status: "Failure", message: error.message });
  }
};
