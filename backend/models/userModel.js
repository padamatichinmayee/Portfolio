const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, 
}, { timestamps: true });

// ✅ Prevent Overwriting Error
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
