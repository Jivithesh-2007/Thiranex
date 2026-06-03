const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
const sanitizeMiddleware = require("../middleware/sanitize");

// Public routes
router.get("/:postId/comments", commentController.getPostComments);

// Protected routes
router.post(
  "/:postId/comments",
  authMiddleware,
  sanitizeMiddleware,
  commentController.createComment
);

router.put(
  "/:commentId",
  authMiddleware,
  sanitizeMiddleware,
  commentController.updateComment
);

router.delete("/:commentId", authMiddleware, commentController.deleteComment);
router.post("/:commentId/like", authMiddleware, commentController.likeComment);
router.put(
  "/:commentId/approve",
  authMiddleware,
  adminMiddleware,
  commentController.approveComment
);

module.exports = router;
