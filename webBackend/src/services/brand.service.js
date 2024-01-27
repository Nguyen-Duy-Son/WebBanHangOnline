const brand = require("../models/brand.model")
const httpStatus = require('http-status')
const ApiError = require("../utils/ApiError")

const getBrand = async(brandId)=>{
    const brand = await brand.findById(brandId);
    if(!brand) throw new ApiError(httpStatus.NOT_FOUND,'brand not found');
    return brand;
}

const getBrands = async (filter, options) => {
    const brands = await brand.paginate(filter, options);
    if (!brands || brands.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'brands not found');
    }
    return brands;
};

const createBrand = async (brandBody) => {
    const rawbrand = await brand.findOne({name:brandBody.name});
    if(rawbrand) throw new ApiError(httpStatus.NOT_FOUND,'brand already exists');
    return brand.create(brandBody);
};

const updateBrandById = async (brandId, brandBody) => {
    const brand = await brand.findByIdAndUpdate(brandId, brandBody, { new: true });
    if (!brand) {
        throw new ApiError(httpStatus.NOT_FOUND, 'brand not found');
    }
    return brand;
};

const deleteBrandById = async (brandId) => {
    const brand = await brand.findByIdAndDelete(brandId);
    if (!brand) {
        throw new ApiError(httpStatus.NOT_FOUND, 'brand not found!');
    }
    return brand;
};

module.exports = {
    getBrand,
    getBrands,
    createBrand,
    updateBrandById,
    deleteBrandById
};


