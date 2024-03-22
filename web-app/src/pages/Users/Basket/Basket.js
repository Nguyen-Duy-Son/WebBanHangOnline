import React, { useState, useEffect } from "react";
import {
  getBasketByUserId,
  getTotalCostOfUser,
} from "~/services/basket.service";
import ProductOfBasket from "./ProductOfBasket";
import { getItem } from "../../../components/LocalStorage/LocalStorage";
import './Basket.css'
const Basket = () => {
  const user = getItem("user");
  const accessToken = getItem("accessToken");

  const [products, setProuducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBasketByUserId(user.id, accessToken.token);
        const total = await getTotalCostOfUser(user.id, accessToken.token);
        setTotalCost(parseInt(total.totalCost));
        setProuducts(result.data.purchasedProducts);
        console.log("productsOfBasket", products);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchData();
  }, [user.id]);
  const handlePayment = () => {
    // Handle payment logic here
  };
  if (!products || products.length === 0) {
    return <div className="empty-basket-message">Chưa có sản phẩm nào ở giỏ hảng. Hãy thêm sản phẩm vào giỏ hàng!!!</div>;
  }

  return (
    <div className="product-list-container">
      <p className="product-list-content shadow bg-stone-300 w-full h-full">
        <b>Sản Phẩm Ở Giỏ Hàng</b>
      </p>
      {products && (
        <div className="">
          {products.map((item, index) => (
            <ProductOfBasket
              props={item}
              key={index}
              setTotalCost={setTotalCost}
              setProuducts={setProuducts}
            />
          ))}
        </div>
      )}
      <div className="total-cost-container">
        <p className="total-cost-text">Tổng tiền là: {totalCost}</p>
        <button className="payment-button" onClick={handlePayment}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};
export default Basket;
