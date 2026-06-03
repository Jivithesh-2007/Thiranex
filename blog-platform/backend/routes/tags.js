const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

// Public routes
router.get("/", tagController.getTags);
router.post("/", tagController.createTag);

module.exports = router;
