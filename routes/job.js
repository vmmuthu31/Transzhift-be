const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const Driver = require("../models/driver");

router.post("/post-job", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during job posting" });
  }
});

router.post("/approve-job/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    job.status = "Approved";
    await job.save();
    res.status(200).json({ message: "Job approved successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during job approval" });
  }
});

router.get("/job-applicants/:jobId", async (req, res) => {
  try {
    const applicants = await Driver.find({ applications: req.params.jobId });
    if (applicants.length === 0) {
      return res
        .status(404)
        .json({ error: "No applicants found for this job" });
    }

    res.status(200).json({ applicants });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching job applicants" });
  }
});

router.get("/match-jobs/:driverId", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.driverId);
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    const matchingJobs = await Job.find({
      location: driver.basicInfo.currentLocation,
      vehicleType: driver.professionalInfo.vehicleExpertise,
      experienceRequired: { $lte: driver.professionalInfo.experienceDetails },
      status: "Approved",
    });

    res
      .status(200)
      .json({ message: "Matching jobs retrieved", jobs: matchingJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during job matching" });
  }
});

router.post("/apply-job/:driverId/:jobId", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.driverId);
    const job = await Job.findById(req.params.jobId);

    if (!driver || !job) {
      return res.status(404).json({ error: "Driver or Job not found" });
    }

    if (!driver.applications) driver.applications = [];
    driver.applications.push(jobId);
    await driver.save();

    res.status(200).json({ message: "Job application successful", driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during job application" });
  }
});

module.exports = router;
