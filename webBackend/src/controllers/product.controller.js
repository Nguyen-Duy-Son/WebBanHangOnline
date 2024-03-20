const productService = require("../services/product.service")
const httpStatus = require("http-status")
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')

const getProducts = catchAsync(async(req,res,next)=>{
    // const filter = pick(req.query, ['nameBrand']);
    // const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const product = await productService.getProducts();
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get Products successfully!',
        data: product,
    });
})

const getProductById = catchAsync(async (req, res, next) => {
    const productId = req.params.productId || req.product.id;
    const Product = await productService.getProduct(productId);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get product by id successfully!',
        data: Product,
    });
});

const createProduct = catchAsync(async (req, res, next) => {
    if (!req.file) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required');
    }

    const imageFile = req.file;
    const imagePath = imageFile.path.replace(/\\/g, '/');
    const product = {
        ...req.body,
        image: imagePath,
    };
    const Product = await productService.createProduct(product);
    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create Product successfully!',
        data: Product,
    });
});

const updateProductById = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const updateBody = req.body;
    const Product = await productService.updateProduct(productId, updateBody);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update Product successfully!',
        data: Product,
    });
});

const deleteProductById = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const product = await productService.deleteProduct(productId);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete Product successfully!',
        data: product,
    });
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};

