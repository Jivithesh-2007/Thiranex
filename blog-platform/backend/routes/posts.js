const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth");
const sanitizeMiddleware = require("../middleware/sanitize");

// Public routes
router.get("/", postController.getPosts);
router.get("/search", postController.searchPosts);
router.get("/id/:id", postController.getPostById);
router.get("/:slug", postController.getPostBySlug);
router.get("/user/:userId", postController.getUserPosts);

// Protected routes
router.post("/", authMiddleware, sanitizeMiddleware, postController.createPost);
router.put("/:id", authMiddleware, sanitizeMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);
router.put("/:id/publish", authMiddleware, postController.publishDraft);

module.exports = router;
