const User = require("../models/User");

exports.updateResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resume = `/uploads/resumes/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: "Resume uploaded successfully", resume: user.resume });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
