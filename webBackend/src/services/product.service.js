const Product = require("../models/product.model")
const httpStatus = require('http-status')
const ApiError = require("../utils/ApiError")

const getProduct = async(productId)=>{
    const product = await Product.findById(productId);
    if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product not found');
    return product;
}

const getProducts = async (filter, options) => {
    const products = await Product.paginate(filter, options);
    if (!products || products.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Products not found');
    }
    return products;
};
const createProduct = async (productBody) => {
    const rawProduct = await Product.findOne({name:productBody.name});
    if(rawProduct) throw new ApiError(httpStatus.NOT_FOUND,'Product already exists');
    return Product.create(productBody);
};

const updateProduct = async (productId, productBody) => {
    const product = await Product.findByIdAndUpdate(productId, productBody, { new: true });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return product;
};

const deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'product not found!');
    }
    return product;
};

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};


