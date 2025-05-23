const Stat = require('../models/Stats');

exports.createStat = async (req, res) => {
  const { title, value, category } = req.body;
  const stat = new Stat({ title, value, category, user: req.userId });
  await stat.save();
  res.status(201).json(stat);
};

exports.getStats = async (req, res) => {
  const stats = await Stat.find({ user: req.userId });
  res.json(stats);
};
