const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", unique: true },
  home: {
    title: String,
    subtitle: String,
    profilePic: String,
  },
  about: {
    description: String,
  },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    }
  ],
  techStack: [String],
  projects: [
    {
      title: String,
      description: String,
      image: String,
      githubLink: String,
    }
  ],
  contact: {
    email: String,
    phone: String,
    linkedin: String,  // ✅ Added LinkedIn field
    instagram: String, // ✅ Added Instagram field
    github: String,    // ✅ Added GitHub field
  }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
