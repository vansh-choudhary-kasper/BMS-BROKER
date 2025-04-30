// Core modules and packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Custom utilities and config
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const securityMiddleware = require('./middleware/security');
const rateLimiter = require('./middleware/rateLimiter');

// Route imports
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const taskRoutes = require('./routes/task');
const bankRoutes = require('./routes/bank');
const expenseRoutes = require('./routes/expense');
const brokerRoutes = require('./routes/broker');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const statementRoutes = require('./routes/statementRoutes');
const advanceRoutes = require('./routes/advance');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(rateLimiter);
app.use(securityMiddleware);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/brokers', brokerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/statements', statementRoutes);
app.use('/api/advances', advanceRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
});
