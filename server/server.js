require('dotenv').config();
const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/config/database');
const { setMongoStatus } = require('./src/services/auth.service');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5001;

// Create logs directory
const fs = require('fs');
const path = require('path');
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const startServer = async () => {
    try {
        // Connect to database
        const isConnected = await connectDB();
        setMongoStatus(isConnected);

        if (!isConnected) {
            logger.warn('Running in OFFLINE MODE - Data will be stored in memory');
        }

        // Start server
        const server = app.listen(PORT, '0.0.0.0', () => {
            logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
            logger.info(`API Documentation: http://localhost:${PORT}/`);
        });

        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            logger.info(`${signal} received. Starting graceful shutdown...`);

            server.close(async () => {
                logger.info('HTTP server closed');
                await disconnectDB();
                process.exit(0);
            });

            // Force shutdown after 10 seconds
            setTimeout(() => {
                logger.error('Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            logger.error('Unhandled Rejection:', err);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
