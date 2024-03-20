const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const roles = (rolesAllow) => (req, res, next) => {
    console.log(req.user.role);
    if (!rolesAllow.includes(req.user.role)) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!'));
    }
    next();
};

module.exports = roles;