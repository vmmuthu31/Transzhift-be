// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// Initialize Express app and middleware
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://starknethh:starknethh@cluster0.4q4ho.mongodb.net/Transzhift",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/transporter", transporterRoutes);
app.use("/api/driver", driverRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
