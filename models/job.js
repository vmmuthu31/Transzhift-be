const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobType: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  experienceRequired: { type: String, required: true },
  vehicleType: { type: String, required: true },
  routeDetails: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved"],
    default: "Pending",
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
