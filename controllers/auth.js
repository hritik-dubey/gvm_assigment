// controllers/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// In-memory storage for users
let users = [];

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const userExist = users.find(user => user.username === username);
        if (userExist) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: uuidv4(), username, password: hashedPassword };
        users.push(user);
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Failed to register user', err);
        res.status(500).send('Internal Server Error');
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).send('Cannot find user');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken });
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (err) {
        console.error('Internal server error', err);
        res.status(500).send('Internal Server Error');
    }
};

// Create a task by an admin user
exports.createTaskByAdmin = (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Forbidden - Only admin can create tasks');
    }

    const { title, description } = req.body;
    const newTask = { id: uuidv4(), title, description, createdBy: req.user.id };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

module.exports = exports;
