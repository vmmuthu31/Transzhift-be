const express = require("express");
const router = express.Router();
const Job = require("../models/job");

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

module.exports = router;
