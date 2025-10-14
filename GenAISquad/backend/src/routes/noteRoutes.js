const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotesByFolder,
  updateNote,
  generateSummary
} = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createNote);
router.get('/:folderId', auth, getNotesByFolder);
router.put('/:noteId', auth, updateNote);
router.post('/:noteId/summary', auth, generateSummary);

module.exports = router;

