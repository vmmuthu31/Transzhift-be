const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://starknethh:starknethh@cluster0.4q4ho.mongodb.net/Transzhift"
);

const transporterRoutes = require("./routes/transporter");
const driverRoutes = require("./routes/driver");

app.use("/api/transporter", transporterRoutes);
app.use("/api/driver", driverRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Transhift API is running successfully!" });
});
