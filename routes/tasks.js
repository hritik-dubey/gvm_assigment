// routes/tasks.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const tasksController = require('../controllers/tasks');

router.post('/', authenticateToken, tasksController.createTask);
router.get('/', authenticateToken, tasksController.getAllTasks);
router.get('/:id', authenticateToken, tasksController.getTaskById);
router.put('/:id', authenticateToken, tasksController.updateTask);
router.delete('/:id', authenticateToken, tasksController.deleteTask);

module.exports = router;
