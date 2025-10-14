const express = require('express');
const router = express.Router();
const { createNodes, getNodes } = require('../controllers/nodeController');
const auth = require('../middleware/authMiddleware');

router.post('/:noteId/generate', auth, createNodes);
router.get('/:noteId', auth, getNodes);

module.exports = router;


