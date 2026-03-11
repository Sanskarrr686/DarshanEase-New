const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const templeRoutes = require("./routes/templeRoutes");
const darshanRoutes = require("./routes/darshanRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

// connect database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/darshan", darshanRoutes);
app.use("/api/bookings", bookingRoutes);

// test route
app.get("/", (req, res) => {
  res.send("DarshanEase API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
