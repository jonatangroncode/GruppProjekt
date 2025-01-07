const express = require('express');
const router = express.router();
const authMiddleware = require('../middlewares/authenticateToken.js');
const {
   postMessage,
   getMessage,
   getAllMessages,
   deleteMessage,
} = require('../controllers/messageController.js');

router.post('/messages', postMessage);

router.get('/messages', getMessage);

router.get('/conversations', getAllMessages);

router.delete('/messages/:msgID', authMiddleware, deleteMessage);


module.exports = router;