const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { generateSlug, makeSlugUnique, calculateReadTime } = require("../utils/slug");
const { POST_STATUS, ROLES } = require("../utils/constants");

// Get all posts with filters and pagination
exports.getPosts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10, sort = "-createdAt", search } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNum - 1) * limitNum;

    let filter = { status: POST_STATUS.PUBLISHED };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate("authorId", "name avatar bio email")
      .lean();

    res.json({
      posts,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    next(error);
  }
};

// Get single post by slug
exports.getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug, status: POST_STATUS.PUBLISHED })
      .populate("authorId", "name avatar bio email socialLinks followerCount");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Get single post by ID (for editing - author only)
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("authorId", "name avatar bio email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Create post
exports.createPost = async (req, res, next) => {
  try {
    // Only writers can create posts
    if (req.user.role !== ROLES.WRITER && req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        message: "Only writers can create posts",
      });
    }

    const { title, content, excerpt, featuredImage, category, tags, metaDescription, status } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    let baseSlug = generateSlug(title);
    const slug = await makeSlugUnique(baseSlug, Post);

    let postExcerpt = excerpt;
    if (!postExcerpt) {
      const plainText = content.replace(/<[^>]*>/g, "");
      postExcerpt = plainText.substring(0, 150);
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt: postExcerpt,
      featuredImage,
      authorId: req.user._id,
      category,
      tags: tags || [],
      metaDescription,
      status: status || POST_STATUS.DRAFT,
      publishedAt: status === POST_STATUS.PUBLISHED ? new Date() : null,
    });

    await post.populate("authorId", "name avatar email");

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, featuredImage, category, tags, metaDescription, status } =
      req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is author or admin
    if (post.authorId.toString() !== req.user._id.toString() && req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        message: "You can only edit your own posts",
      });
    }

    if (title && title !== post.title) {
      const baseSlug = generateSlug(title);
      post.slug = await makeSlugUnique(baseSlug, Post, id);
      post.title = title;
    }

    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;
    if (featuredImage) post.featuredImage = featuredImage;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (metaDescription) post.metaDescription = metaDescription;
    if (status) {
      post.status = status;
      if (status === POST_STATUS.PUBLISHED && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }

    post.updatedAt = new Date();
    await post.save();
    await post.populate("authorId", "name avatar email");

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is author or admin
    if (post.authorId.toString() !== req.user._id.toString() && req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        message: "You can only delete your own posts",
      });
    }

    // Delete all comments on this post
    await Comment.deleteMany({ postId: id });

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get user's posts
exports.getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNum - 1) * limitNum;

    let filter = { authorId: userId };

    // If viewing own posts, show all statuses; otherwise only published
    if (!req.user || req.user._id.toString() !== userId) {
      filter.status = POST_STATUS.PUBLISHED;
    }

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate("authorId", "name avatar email");

    res.json({
      posts,
      total,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

// Publish draft
exports.publishDraft = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString() && req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        message: "You can only publish your own posts",
      });
    }

    if (post.status === POST_STATUS.PUBLISHED) {
      return res.status(400).json({ message: "Post is already published" });
    }

    post.status = POST_STATUS.PUBLISHED;
    post.publishedAt = new Date();
    await post.save();
    await post.populate("authorId", "name avatar email");

    res.json({
      message: "Post published successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Search posts
exports.searchPosts = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNum - 1) * limitNum;

    const searchFilter = {
      status: POST_STATUS.PUBLISHED,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ],
    };

    const total = await Post.countDocuments(searchFilter);
    const posts = await Post.find(searchFilter)
      .skip(skip)
      .limit(limitNum)
      .sort("-createdAt")
      .populate("authorId", "name avatar email");

    res.json({
      posts,
      total,
      pages: Math.ceil(total / limitNum),
      query: q,
    });
  } catch (error) {
    next(error);
  }
};
