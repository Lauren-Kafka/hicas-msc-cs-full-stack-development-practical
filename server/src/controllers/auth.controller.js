const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);

    res.status(201).json({
        success: true,
        ...result,
    });
});

const login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);

    res.status(200).json({
        success: true,
        ...result,
    });
});

const getMe = catchAsync(async (req, res) => {
    const user = await authService.getProfile(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

const logout = catchAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
});

module.exports = {
    register,
    login,
    getMe,
    logout,
};
