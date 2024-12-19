const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticateToken')


router.get('/', authenticateUser, noteController.getTodo);
router.post('/', authenticateUser, noteController.addTodo);
router.put('/:id', authenticateUser, noteController.updateTodo);
router.delete('/:id', authenticateUser, noteController.deleteTodo);

module.exports = router;    