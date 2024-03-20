const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { userValidation } = require('../../validations');
const {userController} = require('../../controllers');
const roles = require('../../middlewares/role.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const userRouter = express.Router();

// userRouter.use(authMiddleware);

userRouter
    .route('/')
    .get(validate(userValidation.getUsers), userController.getUsers)
    .post(validate(userValidation.createUser), userController.createUser);
   
userRouter
    .route('/email')
    .get(validate(userValidation.getUserByEmail), userController.getUserByEmail)

userRouter
    .route('/:userId')
    .get(validate(userValidation.getUser), userController.getUser)
    .put(validate(userValidation.updateUser), userController.updateUser)
    .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = userRouter;