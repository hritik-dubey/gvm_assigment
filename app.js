// app.js
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

// Import the authenticateToken middleware
const authenticateToken = require('./middleware/authenticateToken');

const app = express();

app.use(bodyParser.json());

// swagger docs
app.use(`/api/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const tasksRoutes = require('./routes/tasks');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');

// Apply the authenticateToken middleware to the routes that require authentication
app.use('/tasks', authenticateToken, tasksRoutes);
app.use('/upload', authenticateToken, uploadRoutes);
app.use('/', authRoutes);

module.exports = app;
