const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const sanitizeMiddleware = require("../middleware/sanitize");

// Public routes
router.get("/:userId", userController.getUserProfile);
router.get("/:userId/posts", userController.getUserPosts);

// Protected routes
router.put(
  "/profile",
  authMiddleware,
  sanitizeMiddleware,
  userController.updateProfile
);

router.post("/:userId/follow", authMiddleware, userController.followUser);
router.get("/my/comments", authMiddleware, userController.getUserComments);

module.exports = router;
