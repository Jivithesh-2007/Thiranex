const Tag = require("../models/Tag");

// Get all tags
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort("-postCount");
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// Create tag (auto-create when used)
exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    let tag = await Tag.findOne({ slug });
    if (tag) {
      return res.json(tag);
    }

    tag = await Tag.create({
      name,
      slug,
    });

    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};
