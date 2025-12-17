const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

// In-memory store for offline mode
const inMemoryUsers = [];
let isMongoConnected = false;

const setMongoStatus = (status) => {
    isMongoConnected = status;
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secretKey', {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
};

const register = async (userData) => {
    const { name, email, password } = userData;

    // Offline mode
    if (!isMongoConnected) {
        logger.info(`[Register] Offline Mode: ${email}`);

        if (inMemoryUsers.find((u) => u.email === email)) {
            throw new ApiError(400, 'User already exists (Offline)');
        }

        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            _id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        inMemoryUsers.push(newUser);
        logger.info(`[Register] Success (Offline): ${email}`);

        return {
            message: 'User registered successfully (Offline Mode)',
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        };
    }

    // Online mode with MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({ name, email, password });
    logger.info(`[Register] Success: ${email}`);

    return {
        message: 'User registered successfully',
        user: { id: user._id, name: user.name, email: user.email },
    };
};

const login = async (credentials) => {
    const { email, password } = credentials;

    let user;

    // Offline mode
    if (!isMongoConnected) {
        logger.info(`[Login] Offline Mode: ${email}`);
        user = inMemoryUsers.find((u) => u.email === email);

        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const token = generateToken(user._id);
        logger.info(`[Login] Success (Offline): ${email}`);

        return {
            token,
            user: { id: user._id, name: user.name, email: user.email },
        };
    }

    // Online mode with MongoDB
    user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Check if account is locked
    if (user.isLocked()) {
        throw new ApiError(423, 'Account is locked due to too many failed login attempts. Try again later.');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        await user.incLoginAttempts();
        throw new ApiError(401, 'Invalid credentials');
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
        await user.updateOne({ $set: { loginAttempts: 0 }, $unset: { lockUntil: 1 } });
    }

    const token = generateToken(user._id);
    logger.info(`[Login] Success: ${email}`);

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
};

const getProfile = async (userId) => {
    // Offline mode
    if (!isMongoConnected) {
        const user = inMemoryUsers.find((u) => u._id === userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Online mode
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};

module.exports = {
    register,
    login,
    getProfile,
    setMongoStatus,
};
