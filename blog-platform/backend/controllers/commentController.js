const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { ROLES } = require("../utils/constants");

// Get comments for a post (with nesting support)
exports.getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { sort = "-createdAt" } = req.query;

    // Get top-level comments only
    const comments = await Comment.find({
      postId,
      parentCommentId: null,
    })
      .sort(sort)
      .populate("authorId", "name avatar email bio")
      .populate({
        path: "likes",
        select: "name email avatar",
      })
      .lean();

    // For each comment, fetch replies recursively
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await fetchReplies(comment._id, sort);
        return {
          ...comment,
          replies,
          replyCount: replies.length,
        };
      })
    );

    res.json({
      comments: commentsWithReplies,
      total: commentsWithReplies.length,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to fetch nested replies
const fetchReplies = async (parentCommentId, sort = "-createdAt", depth = 0) => {
  if (depth >= 5) return []; // Limit nesting depth

  try {
    const replies = await Comment.find({
      parentCommentId,
    })
      .sort(sort)
      .populate("authorId", "name avatar email bio")
      .populate({
        path: "likes",
        select: "name email avatar",
      })
      .lean();

    // Recursively fetch replies of replies
    const repliesWithNested = await Promise.all(
      replies.map(async (reply) => {
        const nestedReplies = await fetchReplies(reply._id, sort, depth + 1);
        return {
          ...reply,
          replies: nestedReplies,
          replyCount: nestedReplies.length,
        };
      })
    );

    return repliesWithNested;
  } catch (error) {
    console.error("Error fetching replies:", error);
    return [];
  }
};

// Create comment
exports.createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let parentComment = null;
    if (parentCommentId) {
      parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    const comment = await Comment.create({
      postId,
      authorId: req.user._id,
      content: content.trim(),
      parentCommentId: parentCommentId || null,
      approved: true,
    });

    // Update parent comment reply count
    if (parentComment) {
      parentComment.replyCount = (parentComment.replyCount || 0) + 1;
      await parentComment.save();
    }

    // Increment post comment count
    post.commentCount += 1;
    await post.save();

    await comment.populate("authorId", "name avatar email bio");

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// Update comment
exports.updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is author or admin
    if (
      comment.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== ROLES.ADMIN
    ) {
      return res.status(403).json({
        message: "You can only edit your own comments",
      });
    }

    comment.content = content.trim();
    comment.updatedAt = new Date();
    await comment.save();
    await comment.populate("authorId", "name avatar email bio");

    res.json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is author or admin
    if (
      comment.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== ROLES.ADMIN
    ) {
      return res.status(403).json({
        message: "You can only delete your own comments",
      });
    }

    // Decrement post comment count
    const post = await Post.findById(comment.postId);
    if (post) {
      post.commentCount = Math.max(0, post.commentCount - 1);
      await post.save();
    }

    // Update parent comment reply count
    if (comment.parentCommentId) {
      const parentComment = await Comment.findById(comment.parentCommentId);
      if (parentComment) {
        parentComment.replyCount = Math.max(0, (parentComment.replyCount || 1) - 1);
        await parentComment.save();
      }
    }

    // Delete all replies to this comment
    await Comment.deleteMany({ parentCommentId: commentId });

    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Like comment
exports.likeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const userLikeIndex = comment.likes.indexOf(req.user._id);

    if (userLikeIndex === -1) {
      comment.likes.push(req.user._id);
      comment.likeCount += 1;
    } else {
      comment.likes.splice(userLikeIndex, 1);
      comment.likeCount = Math.max(0, comment.likeCount - 1);
    }

    await comment.save();
    await comment.populate("authorId", "name avatar email bio");
    await comment.populate("likes", "name email avatar");

    res.json({
      message: userLikeIndex === -1 ? "Comment liked" : "Like removed",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// Approve comment (admin/post author)
exports.approveComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await Post.findById(comment.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is post author or admin
    if (post.authorId.toString() !== req.user._id.toString() && req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        message: "Only post author or admin can approve comments",
      });
    }

    comment.approved = true;
    await comment.save();
    await comment.populate("authorId", "name avatar email bio");

    res.json({
      message: "Comment approved",
      comment,
    });
  } catch (error) {
    next(error);
  }
};
