const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  basicInfo: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    alternateContact: { type: String },
    currentLocation: { type: String, required: true },
    homeLocation: { type: String },
    aadhaarNumber: { type: String, required: true, unique: true },
    panCardDetails: { type: String, required: true },
  },
  professionalInfo: {
    licenseType: { type: String, required: true },
    licenseValidity: { type: Date, required: true },
    experienceDetails: { type: String, required: true },
    vehicleExpertise: { type: String, required: true },
    routePreferences: { type: String },
    languageProficiency: { type: String },
    expectedSalary: { type: Number, required: true },
  },
  documents: {
    drivingLicense: { type: String, required: true },
    aadhaarCard: { type: String, required: true },
    panCard: { type: String, required: true },
    experienceCertificates: { type: String },
    policeVerification: { type: String, required: true },
    medicalFitnessCertificate: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["Pending", "Verified", "Active"],
    default: "Pending",
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
