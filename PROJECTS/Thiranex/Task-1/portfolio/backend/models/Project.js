const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  techStack: [String],
  liveUrl: { type: String },
  codeUrl: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
