const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService, emailService } = require('../services/index');


const register = catchAsync(async (req, res, next) => {
    const userBody = req.body;

    const user = await userService.createUser(userBody);
    const token = await tokenService.createAuthTokens(user);
    res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: 'Register successfully!',
        data: user,
        accessToken:token
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await authService.login(email, password);
    const token = await tokenService.createAuthTokens(user);

    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Login successfully!',
        accessToken: token,
    });
});

const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await authService.forgotPassword(email);
    await emailService.sendResetPasswordEmail(email, user.userName, user.emailToken, 'Đặt lại mật khẩu');

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Created emailToken successfully!',
        data: user.emailToken,
    });
});

const resetPassword = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    await authService.resetPassword(email, password);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Reset password successfully!',
        data: [],
    });
});

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
};