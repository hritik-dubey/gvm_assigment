// controllers/tasks.js
const { v4: uuidv4 } = require('uuid');
let tasks = [];

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        description
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

exports.getAllTasks = (req, res) => {
    res.json(tasks);
};

exports.getTaskById = (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
};

exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description || tasks[taskIndex].description
    };
    res.json(tasks[taskIndex]);
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
};
