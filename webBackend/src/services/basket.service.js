const Basket = require("../models/basket.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getBasketByUserId = async (userId) => {
  const basket = await Basket.findOne({userId:userId});
  if (!basket) throw new ApiError(httpStatus.NOT_FOUND, "basket not found");
  return basket;
};

const getBaskets = async (filter, options) => {
  const baskets = await Basket.paginate(filter, options);
  if (!baskets || baskets.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "baskets not found");
  }
  return baskets;
};

const createBasket = async (basketBody) => {
  console.log("aloo");
  const rawBasket = await Basket.findOne({ userId: basketBody.userId });
  if (rawBasket)
    throw new ApiError(httpStatus.NOT_FOUND, "Basket already exists");
  return Basket.create(basketBody);
};

const updateBasketById = async (backetId, basketBody) => {
  const basket = await Basket.findByIdAndUpdate(backetId, basketBody, {
    new: true,
  });
  if (!basket) {
    throw new ApiError(httpStatus.NOT_FOUND, "basket not found");
  }
  return basket;
};

const deleteBasketById = async (backetId) => {
  const basket = await Basket.findByIdAndDelete(backetId);
  if (!basket) {
    throw new ApiError(httpStatus.NOT_FOUND, "basket not found to delete!");
  }
  return basket;
};
const addProductToBasket = async (productId, userId, status) => {
  const basketOfUser = await Basket.findOne({ userId: userId });
  if (!basketOfUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "basket not found");
  }
  if (status == "add") {
    const existingProduct = basketOfUser.purchasedProducts.find(
      (product) => product.productId.toString() === productId,
    );

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, tăng numberOfProduct lên 1
      existingProduct.numberOfProduct += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng với numberOfProduct là 1
      basketOfUser.purchasedProducts.push({
        productId: productId,
        numberOfProduct: 1,
      });
    }
  } else if (status == "delete") {
    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    const existingProductIndex = basketOfUser.purchasedProducts.findIndex(
      (product) => product.productId.toString() === productId,
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, giảm numberOfProduct đi 1
      const existingProduct =
        basketOfUser.purchasedProducts[existingProductIndex];
      if (existingProduct.numberOfProduct >= 1) {
        existingProduct.numberOfProduct -= 1;
      } else {
        // Nếu numberOfProduct là 1, xoá sản phẩm khỏi mảng purchasedProducts
        basketOfUser.purchasedProducts.splice(existingProductIndex, 1);
      }
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "product not found in the basket",
      );
    }
  }
  // Lưu giỏ hàng đã cập nhật
  await basketOfUser.save();
  return basketOfUser;
};
module.exports = {
  getBasketByUserId,
  getBaskets,
  createBasket,
  updateBasketById,
  deleteBasketById,
  addProductToBasket,
};
