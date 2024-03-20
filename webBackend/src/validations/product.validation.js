const Joi = require('joi')
const {objectId} = require('./custom.validation')

const createProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        nameBrand: Joi.string().required(),
        cost:Joi.number().required(),
        image:Joi.string().required()
    })
}
const getProducts = {
    query: Joi.object().keys({
        brandId:Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}
const getProduct = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId),
    }),
};
const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            nameBrand: Joi.string().required(),
            cost:Joi.number(),
            image:Joi.string()
        })
        .min(1),
};
const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId),
    }),
};
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}
