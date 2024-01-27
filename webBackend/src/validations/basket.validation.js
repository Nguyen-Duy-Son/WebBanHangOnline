const Joi = require('joi')
const {objectId} = require('./custom.validation')

const createBasket = {
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
        purchasedProducts:Joi.array().items({
            productId:Joi.string().custom(objectId),
            numberOfProduct:Joi.number().integer()
        }),
        totalCost:Joi.number()
    })
}
const getBaskets = {
    query: Joi.object().keys({
        basketId:Joi.string().custom(objectId),
        userId:Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}
const getBasketByUserId = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
    }),
};
const updateBasket = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object()
        .keys({
            userId: Joi.string().custom(objectId).required(),
            purchasedProducts:Joi.array().items({
                productId:Joi.string().custom(objectId),
                numberOfProduct:Joi.number().integer()
            })
        })
        .min(1),
};
const deleteBasket = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
    }),
};
const addOrDeleteProductToBasketOfUser ={
    body: Joi.object().keys({
        productId:Joi.required().custom(objectId),
        userId: Joi.required().custom(objectId),
        status:Joi.string().required(),
    })
}

module.exports = {
    createBasket,
    getBasketByUserId,
    getBaskets,
    updateBasket,
    deleteBasket,
    addOrDeleteProductToBasketOfUser
}