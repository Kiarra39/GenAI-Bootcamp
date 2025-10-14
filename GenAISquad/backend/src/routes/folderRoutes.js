const express = require('express');
const router = express.Router();
const { createFolder, getFolders } = require('../controllers/folderController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createFolder);
router.get('/', auth, getFolders);

module.exports = router;

