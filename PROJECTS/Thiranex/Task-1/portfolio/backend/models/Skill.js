const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [{ name: String, level: String }],
});

module.exports = mongoose.model('Skill', SkillSchema);
