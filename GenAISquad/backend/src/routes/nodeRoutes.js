const express = require('express');
const router = express.Router();
const { createNodes, getNodes,updateNode,deleteNode} = require('../controllers/nodeController');
const auth = require('../middleware/authMiddleware');

router.post('/:noteId/generate', auth, createNodes);
router.get('/:noteId', auth, getNodes);
router.put('/:noteId',auth,updateNode);
router.delete('/:noteId',auth,deleteNode);



module.exports = router;


