const express = require("express");
const { registerUser, loginUser, updateProfile, updatePassword } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

router.get("/me", protect,(req, res) => {
    return res.status(200).json({
        success: true,
        message: "Authentication successful",
        user: req.user,
    });
});

module.exports = router;