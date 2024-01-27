const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { brandValidation } = require('../../validations');
const { brandController } = require('../../controllers');
const roles = require('../../middlewares/role.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const brandRouter = express.Router();

// brandRouter.use(authMiddleware);

brandRouter
    .route('/')
    .get(validate(brandValidation.getBrands), brandController.getBrands)
    .post(validate(brandValidation.createBrand), brandController.createBrand);

brandRouter
    .route('/:brandId')
    .get(validate(brandValidation.getBrand), brandController.getBrand)
    .put(validate(brandValidation.updateBrand), brandController.updateBrand)
    .delete(validate(brandValidation.deleteBrand), brandController.deleteBrand);

module.exports = brandRouter;