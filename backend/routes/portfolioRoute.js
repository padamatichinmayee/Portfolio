const express = require("express");
const Portfolio = require("../models/Portfolio"); 
const router = express.Router();
const multer = require("multer");

// Multer storage setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// 🏠 **Update Home Section**
router.post("/:userId/home", upload.single("profilePic"), async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { "home.title": title, "home.subtitle": subtitle, "home.profilePic": profilePic } },
      { new: true, upsert: true }
    );

    res.json({ message: "Home section updated successfully!", portfolio });
  } catch (error) {
    res.status(500).json({ error: "Error updating home section." });
  }
});

// 📖 **Update About Section**
router.post("/:userId/about", async (req, res) => {
  try {
    const { description } = req.body;
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { "about.description": description } },
      { new: true, upsert: true }
    );
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ error: "Error updating About section." });
  }
});

// 🎓 **Update Education Section**
router.post("/:userId/education", async (req, res) => {
  try {
    const { degree, institution, year } = req.body;
    let portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { education: { degree, institution, year } } },
      { new: true, upsert: true }
    );

    res.json({ message: "Education updated successfully!", education: portfolio.education });
  } catch (error) {
    res.status(500).json({ error: "Error updating education." });
  }
});

// 🛠️ **Update Tech Stack**
router.post("/:userId/techstack", async (req, res) => {
  try {
    const { tech } = req.body;
    let portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { $addToSet: { techStack: tech } },
      { new: true, upsert: true }
    );

    res.json({ message: "Tech stack updated successfully!", techStack: portfolio.techStack });
  } catch (error) {
    res.status(500).json({ error: "Error updating tech stack." });
  }
});

// 📞 **Update Contact Section**
router.post("/:userId/contact", async (req, res) => {
  try {
    const { email, phone, linkedin, instagram, github } = req.body; // ✅ Include social media links

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { 
        $set: { 
          contact: { email, phone, linkedin, instagram, github } // ✅ Update contact details
        } 
      },
      { new: true, upsert: true }
    );

    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ error: "Error updating contact section." });
  }
});


// 📂 **Add or Update Project**
router.post("/:userId/projects", async (req, res) => {
  try {
    const { title, description, image, githubLink } = req.body;

    let portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { projects: { title, description, image, githubLink } } },
      { new: true, upsert: true }
    );

    res.json({ message: "Project added successfully!", projects: portfolio.projects });
  } catch (error) {
    res.status(500).json({ error: "Error updating projects." });
  }
});

// 🔍 **Get Portfolio for a Specific User**
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    console.log("Fetching portfolio for userId:", userId);
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✏️ **Update Entire Portfolio for a Specific User**
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    let portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json({ message: "Portfolio updated successfully", portfolio });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
