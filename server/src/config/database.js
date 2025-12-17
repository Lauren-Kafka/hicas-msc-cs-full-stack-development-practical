const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/program1_auth',
            {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            }
        );

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
        return true;
        return true;
    } catch (error) {
        if (error.message.includes('ECONNREFUSED') || error.message.includes('connect refused')) {
            console.log('\x1b[33m%s\x1b[0m', '⚠️  MongoDB not found. Starting in OFFLINE MODE (Data stored in memory)');
        } else {
            logger.warn(`MongoDB Connection Failed: ${error.message}`);
            logger.info('Starting in OFFLINE MODE');
        }
        return false;
    }
};

// Graceful shutdown
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed');
    } catch (error) {
        logger.error('Error closing MongoDB connection:', error);
    }
};

module.exports = { connectDB, disconnectDB };
