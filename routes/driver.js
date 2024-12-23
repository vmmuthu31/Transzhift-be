const upload = multer({ storage });
const Driver = require("../models/driver");
const { storage } = require("../utils/utils");
const express = require("express");
const router = express.Router();

router.post(
  "/register-driver",
  upload.fields([
    { name: "drivingLicense", maxCount: 1 },
    { name: "aadhaarCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "experienceCertificates", maxCount: 1 },
    { name: "policeVerification", maxCount: 1 },
    { name: "medicalFitnessCertificate", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { basicInfo, professionalInfo } = req.body;

      const documents = {
        drivingLicense: req.files.drivingLicense[0].path,
        aadhaarCard: req.files.aadhaarCard[0].path,
        panCard: req.files.panCard[0].path,
        experienceCertificates: req.files.experienceCertificates[0]?.path,
        policeVerification: req.files.policeVerification[0].path,
        medicalFitnessCertificate: req.files.medicalFitnessCertificate[0].path,
      };

      const driver = new Driver({
        basicInfo: JSON.parse(basicInfo),
        professionalInfo: JSON.parse(professionalInfo),
        documents,
      });

      await driver.save();

      res
        .status(201)
        .json({ message: "Driver registered successfully", driver });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  }
);

module.exports = router;
