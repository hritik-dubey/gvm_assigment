// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/tasks/admin', authenticateToken, authController.createTaskByAdmin);

module.exports = router;
