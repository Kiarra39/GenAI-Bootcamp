const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotesByFolder,
  updateNote,
  generateSummary,
  deleteNote
} = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createNote);
router.get('/:folderId', auth, getNotesByFolder);
router.put('/:noteId', auth, updateNote);
router.delete('/:id',auth,deleteNote)

module.exports = router;

