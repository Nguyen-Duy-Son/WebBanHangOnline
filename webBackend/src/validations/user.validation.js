const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().custom(password).required(),
        userName:Joi.string().required(),
        role: Joi.string().valid('user', 'admin'),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        userName: Joi.string(),
        email: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};
const getUserByEmail = {
    query: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            password: Joi.string().custom(password),
            phone:Joi.string(),
            userName: Joi.string(),
            avatar: Joi.string(),
            address:Joi.string(),
            role: Joi.string().valid('user', 'admin')
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserByEmail
};