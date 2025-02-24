const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// ✅ Signup Route
router.post("/signup", register);

// ✅ Login Route (Fixed async handling)
router.post("/login", login);

module.exports = router;
