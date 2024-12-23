const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const transporterRoutes = require("./routes/transporter");
const driverRoutes = require("./routes/driver");
const jobRoutes = require("./routes/job");

app.use("/api/v1/transporter", transporterRoutes);
app.use("/api/v1/driver", driverRoutes);
app.use("/api/v1/job", jobRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Transhift API is running successfully!" });
});
