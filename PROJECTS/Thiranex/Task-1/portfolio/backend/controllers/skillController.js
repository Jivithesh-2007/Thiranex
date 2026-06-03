const Skill = require('../models/Skill');

exports.getAll = async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) { next(err); }
};
