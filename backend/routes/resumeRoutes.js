const express = require("express");
const upload = require("../middleware/uploadMiddleware"); 
const { updateResume } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("resume"), updateResume);

module.exports = router;
