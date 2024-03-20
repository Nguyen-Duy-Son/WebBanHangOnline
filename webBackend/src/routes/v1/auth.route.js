const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { login, register} = require('../../controllers/auth.controller');
const { getUser } = require('../../controllers/user.controller');
const {authValidation} = require('../../validations');

const authRouter = express.Router();

authRouter.route('/register').post(validate(authValidation.register), register);

authRouter.route('/login').post(login);

authRouter.use(authMiddleware);

authRouter.route('/me').get(getUser);

module.exports = authRouter;