const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const sanitizeMiddleware = require("../middleware/sanitize");

router.post("/register", sanitizeMiddleware, authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.getProfile);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
