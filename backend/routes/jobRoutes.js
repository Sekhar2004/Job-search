const express = require("express");
const { createJob, getJobs,getEmployerJobs } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/employer", authMiddleware, getEmployerJobs);


module.exports = router;
