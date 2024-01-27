const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const { productValidation } = require("../../validations");
const { productController } = require("../../controllers");
const roles = require("../../middlewares/role.middleware");
const upload = require("../../middlewares/upload.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const productRouter = express.Router();

productRouter
  .route("/")
  .get(validate(productValidation.getProducts), productController.getProducts);
productRouter
  .route("/:productId")
  .get(
    validate(productValidation.getProduct),
    productController.getProductById,
  );
productRouter.use(authMiddleware);
productRouter
  .route("/")
  .post(
    roles("admin"),
    upload.single("image"),
    // validate(productValidation.createProduct),
    productController.createProduct,
  );

productRouter
  .route("/:productId")
  .put(
    roles("admin"),
    validate(productValidation.updateProduct),
    productController.updateProductById,
  )
  .delete(
    roles("admin"),
    validate(productValidation.deleteProduct),
    productController.deleteProductById,
  );
module.exports = productRouter;
