const express = require('express');
const authRoutes = require('./auth.routes');

const router = express.Router();

// API v1 routes
router.use('/auth', authRoutes);

// Health check
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
