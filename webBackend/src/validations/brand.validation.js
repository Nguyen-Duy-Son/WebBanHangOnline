const Joi = require('joi')
const {objectId} = require('./custom.validation')

const createBrand = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        products: Joi.array().items(Joi.string().custom(objectId)),
    })
}
const getBrands = {
    query: Joi.object().keys({
        brandId:Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}
const getBrand = {
    params: Joi.object().keys({
        brandId: Joi.string().custom(objectId),
    }),
};
const updateBrand = {
    params: Joi.object().keys({
        brandId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string().required(),
            products: Joi.array().items(Joi.string().custom(objectId)),
        })
        .min(1),
};
const deleteBrand = {
    params: Joi.object().keys({
        brandId: Joi.string().custom(objectId),
    }),
};
module.exports = {
    createBrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand
}
