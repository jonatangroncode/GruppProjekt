const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authenticateToken.js');
/*const {
   postMessage,
   getMessage,
   getAllMessages,
   deleteMessage,
} = require('../controllers/messageController.js');
 */
const messageController = require('../controllers/messageController.js');

router.post('/', messageController.postMessage);

router.get('/', messageController.getAllMessages);

router.get('/conversations', messageController.getMessage);

router.delete('/:msgID', authMiddleware, messageController.deleteMessage);


module.exports = router;