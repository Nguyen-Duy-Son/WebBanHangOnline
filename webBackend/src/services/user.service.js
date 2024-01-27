const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    return user;
};

const getUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);
    if (!users || users.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
    }
    return users;
};

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
    } else if (await User.isUsernameTaken(userBody.userName)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists!');
    }
    const user = await User.findOne({ userName: userBody.userName });
    
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please fill in all the required information!');
    }
    
    return User.create(userBody);
};

const updateUserById = async (userId, updateBody) => {
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateBody, { new: true });
    if (!updatedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Username already exists!');
    }
    return updatedUser;
};

const deleteUserById = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    return deletedUser;
};
const getUserByEmail = async (emailQuery) => {
    const user = await User.findOne({email:emailQuery});
    console.log(user);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    return user;
};
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    getUserByEmail
};