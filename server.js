const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const carSearchRoutes = require("./routes/carSearchRoutes");
const carDetailsRoutes = require("./routes/carDetailsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const saleRoutes = require("./routes/saleRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); // Include the upload routes

const { findUserById } = require("./models/user");
const {
  authenticateToken,
  authorizeRole,
} = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3001;
const secretKey = "your_secret_key"; // use a secure key in production

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  credentials: true, // Allow cookies to be sent
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());

// Use the routes
app.use("/auth", authRoutes);
app.use("/cars", carRoutes);
app.use("/carDetails", carDetailsRoutes);
app.use("/carSearch", carSearchRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/service", serviceRoutes);
app.use("/serviceReq", serviceRequestRoutes);
app.use("/rental", rentalRoutes);
app.use("/sale", saleRoutes);
app.use("/upload", uploadRoutes); // Use the upload routes

// Example of a protected route
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example of an admin-only route
app.get("/admin", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  res.status(200).json({ message: "Welcome, admin!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
