const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// Public routes
router.get("/", categoryController.getCategories);
router.get("/:slug", categoryController.getCategoryBySlug);

// Admin routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  categoryController.createCategory
);

module.exports = router;
