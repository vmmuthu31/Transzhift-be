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

router.post("/verify-driver/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    driver.status = "Verified";
    await driver.save();
    res.status(200).json({ message: "Driver verified successfully", driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during verification" });
  }
});

router.post("/activate-driver/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    if (driver.status !== "Verified") {
      return res.status(400).json({ error: "Driver must be verified first" });
    }

    driver.status = "Active";
    await driver.save();
    res.status(200).json({ message: "Driver profile activated", driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during activation" });
  }
});

module.exports = router;
