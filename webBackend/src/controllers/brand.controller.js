const brandService = require("../services/brand.service")
const httpStatus = require("http-status")
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')

const getBrands = catchAsync(async(req,res,next)=>{
    const filter = pick(req.query, ['userId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const brand = await brandService.getBrands(filter, options);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get brand successfully!',
        data: brand,
    });
})
const getBrand = catchAsync(async (req, res, next) => {
    const brandId = req.params.brandId || req.brand.id;
    const brand = await brandService.getbrand(brandId);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get brand by id successfully!',
        data: brand,
    });
});

const createBrand = catchAsync(async (req, res, next) => {
    const brand = await brandService.createBrand(req.body);
    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create brand successfully!',
        data: brand,
    });
});


const updateBrand = catchAsync(async (req, res, next) => {
    const { brandId } = req.params;
    const updateBody = req.body;
    const brand = await brandService.updateBrand(brandId, updateBody);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update brand successfully!',
        data: brand,
    });
});

const deleteBrand = catchAsync(async (req, res, next) => {
    const { brandId } = req.params;
    const brand = await brandService.deleteBrand(brandId);
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete brand successfully!',
        data: brand,
    });
});

module.exports = {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
};

