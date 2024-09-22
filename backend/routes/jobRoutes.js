const express = require("express");
const { createJob, getJobs,getEmployerJobs,updateJob,deleteJob } = require("../controllers/jobController");
const { applyToJob, getJobApplicants } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/employer", authMiddleware, getEmployerJobs);

router.put(":/id",authMiddleware,updateJob);
router.delete("/:id",authMiddleware,deleteJob);
router.post("/:id/apply", authMiddleware, applyToJob);
router.get("/:id/applicants", authMiddleware, getJobApplicants);


module.exports = router;
