const User = require("../models/User");
const Post = require("../models/Post");
const { ROLES } = require("../utils/constants");

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's post count
    const postCount = await Post.countDocuments({
      authorId: userId,
      status: "published",
    });

    res.json({
      ...user.toObject(),
      postCount,
    });
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

    const filter = {
      authorId: userId,
      status: "published",
    };

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

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar, socialLinks } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (socialLinks) {
      user.socialLinks = {
        ...user.socialLinks,
        ...socialLinks,
      };
    }

    user.updatedAt = new Date();
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: user.toObject(),
    });
  } catch (error) {
    next(error);
  }
};

// Follow user
exports.followUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    const isFollowing = currentUser.followers?.includes(userId);

    if (isFollowing) {
      // Unfollow
      currentUser.followers = currentUser.followers.filter((id) => id.toString() !== userId);
      userToFollow.followerCount = Math.max(0, userToFollow.followerCount - 1);
    } else {
      // Follow
      if (!currentUser.followers) {
        currentUser.followers = [];
      }
      currentUser.followers.push(userId);
      userToFollow.followerCount += 1;
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({
      message: isFollowing ? "User unfollowed" : "User followed",
      isFollowing: !isFollowing,
      followerCount: userToFollow.followerCount,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's comments
exports.getUserComments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNum - 1) * limitNum;

    const Comment = require("../models/Comment");

    const total = await Comment.countDocuments({
      authorId: req.user._id,
    });

    const comments = await Comment.find({
      authorId: req.user._id,
    })
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .populate("postId", "title slug")
      .populate("authorId", "name avatar email");

    res.json({
      comments,
      total,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};
