const express = require("express");
const User = require("../models/User"); // Import User model
const router = express.Router();

// ✅ Route to get all users (Admin Only)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
