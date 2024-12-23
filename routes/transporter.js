const express = require("express");
const multer = require("multer");
const Transporter = require("../models/transporter");
const { storage } = require("../utils/utils");
const router = express.Router();
const upload = multer({ storage });

router.post(
  "/register-transporter",
  upload.fields([
    { name: "companyRegistration", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
    { name: "insuranceDetails", maxCount: 1 },
    { name: "clientReferences", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { companyInfo, operationalRequirements } = req.body;
      const businessDocuments = {
        companyRegistration: req.files.companyRegistration[0].path,
        gstCertificate: req.files.gstCertificate[0].path,
        tradeLicense: req.files.tradeLicense[0].path,
        insuranceDetails: req.files.insuranceDetails[0].path,
        clientReferences: req.files.clientReferences[0]?.path,
      };
      const transporter = new Transporter({
        companyInfo: JSON.parse(companyInfo),
        businessDocuments,
        operationalRequirements: JSON.parse(operationalRequirements),
      });

      await transporter.save();

      res
        .status(201)
        .json({ message: "Transporter registered successfully", transporter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  }
);

module.exports = router;
