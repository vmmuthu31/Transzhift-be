const mongoose = require("mongoose");

const transporterSchema = new mongoose.Schema({
  companyInfo: {
    companyName: { type: String, required: true },
    registrationDetails: { type: String, required: true },
    gstNumber: { type: String, required: true, unique: true },
    officeLocations: { type: [String], required: true },
    fleetSize: { type: Number, required: true },
    typesOfOperations: { type: [String], required: true },
  },
  businessDocuments: {
    companyRegistration: { type: String, required: true },
    gstCertificate: { type: String, required: true },
    tradeLicense: { type: String, required: true },
    insuranceDetails: { type: String, required: true },
    clientReferences: { type: String },
  },
  operationalRequirements: {
    routesOperated: { type: [String], required: true },
    vehicleTypes: { type: [String], required: true },
    driverRequirements: { type: String, required: true },
    salaryStructures: { type: String, required: true },
    benefitsOffered: { type: String, required: true },
  },
});

const Transporter = mongoose.model("Transporter", transporterSchema);

module.exports = Transporter;
