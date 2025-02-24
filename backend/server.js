const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

// ✅ Ensure "uploads" directory exists
const uploadDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust based on frontend URL
    credentials: true, // Allows cookies/token authentication
  })
);
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form-data

// ✅ Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// ✅ Import and Use Routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const portfolioRoute = require("./routes/portfolioRoute");
const Portfolio = require("./models/Portfolio");

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoute);

// ✅ API to Update Portfolio with Profile Picture
app.post("/api/portfolio/:userId/home", upload.single("profilePic"), async (req, res) => {
  try {
    const { userId } = req.params;
    const requestBody = req.body;
    
    console.log("📩 Received Data:", requestBody);
    console.log("📷 Uploaded File:", req.file);

    let homeData = requestBody.home ? JSON.parse(requestBody.home) : {};
    
    if (req.file) {
      homeData.profilePic = `/uploads/${req.file.filename}`;
    }

    // ✅ Find and Update Portfolio (without overriding other sections)
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { $set: { home: homeData } }, 
      { new: true, upsert: true }
    );

    console.log("✅ Portfolio Updated:", updatedPortfolio);
    res.status(200).json({ message: "Home section updated successfully!", portfolio: updatedPortfolio });
  } catch (error) {
    console.error("❌ Error saving portfolio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Prevents infinite waiting
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
