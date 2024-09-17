const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  const { title, description, company, location, salary, type } = req.body;

  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Only employers can post jobs" });
  }

  try {
    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      type,
      postedBy: req.user.id
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name");
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getEmployerJobs = async (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Access denied. Only employers can view their posted jobs." });
  }

  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};