const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Tag slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
