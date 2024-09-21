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

exports.updateJob = async (req, res) => {
  const { title, description, company, location, salary, type } = req.body;

  try {
    console.log("Received job ID for update:", req.params.id); // Log the job ID
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the logged-in user is the one who posted the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit jobs you posted" });
    }

    // Update job details
    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.type = type || job.type;

    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error("Error updating job:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    // Find the job by ID
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the logged-in user is the one who posted the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete jobs you posted" });
    }

    // Delete the job using findByIdAndDelete()
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
