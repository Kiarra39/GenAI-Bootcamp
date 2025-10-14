const Folder = require('../models/Folder');

exports.createFolder = async (req, res) => {
  try {
    const { title } = req.body;
    const folder = await Folder.create({ title, userId: req.userId });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.userId });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

