const Note = require('../models/Note');
const Folder = require('../models/Folder');
const mongoose = require('mongoose');

exports.createNote = async (req, res) => {
  try {
    const { folderId, title, content } = req.body;

    const folder = await Folder.findOne({ _id: folderId, userId: req.userId });
    if (!folder) return res.status(403).json({ message: 'Folder not found or access denied' });

    const note = await Note.create({
      folderId,
      userId: req.userId,
      title,
      content
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNotesByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const notes = await Note.find({ folderId, userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.userId },
      { title, content, lastModified: new Date() },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
exports.generateSummary = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findOne({ _id: noteId, userId: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // If summary already exists and note not modified, reuse
    if (note.aiSummary && note.aiSummary.text && note.aiSummary.lastGeneratedAt) {
      const timeDiff = new Date() - new Date(note.aiSummary.lastGeneratedAt);
      if (timeDiff < 1000 * 60 * 60 * 24 * 30) {
        return res.json({ summary: note.aiSummary.text, cached: true });
      }
    }

    // Placeholder AI logic (to be replaced with actual OpenAI or local AI)
    const generatedSummary = `Summary for "${note.title}": ${note.content.slice(0, 100)}...`;

    note.aiSummary = {
      text: generatedSummary,
      lastGeneratedAt: new Date()
    };

    await note.save();
    res.json({ summary: generatedSummary, cached: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

