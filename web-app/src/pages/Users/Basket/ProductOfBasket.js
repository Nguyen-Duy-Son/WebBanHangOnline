import React, { useState, useEffect } from "react";
import { getProductById } from "../../../services/product.service";
import {
  addOrDeleteProductOfBasket,
  getTotalCostOfUser,
} from "../../../services/basket.service";
import { getItem } from "../../../components/LocalStorage/LocalStorage";
import "./ProductOfBasket.css";

const ProductOfBasket = ({ props,setTotalCost }) => {
  const user = getItem("user");
  const accessToken = getItem("accessToken");
  const [product, setProduct] = useState([]);
  
  const [number, setNumber] = useState(props.numberOfProduct);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductById(props.productId);
        setProduct(result.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchData();
  }, [props.productId]);

  const handleDeleteProduct = async () => {
    if (number > 0) {
      setNumber(number - 1);
      await updateBasket("delete");
      
    }
  };

  const handleAddProduct = async () => {
    setNumber(number + 1);
    await updateBasket("add");
    
  };

  const updateBasket = async (status) => {
    try {
      await addOrDeleteProductOfBasket(
        user.id,
        accessToken.token,
        props.productId,
        status
      );
      // await getTotalCostOfUser(user.id,accessToken.token)
      const total = await getTotalCostOfUser(user.id, accessToken.token);
      setTotalCost(parseInt(total.totalCost))
    } catch (error) {
      console.error("Error updating basket", error);
    }
  };

  return (
    <div>
      <div className="basket-item">
        <img src={product.image} alt={product.name} />
        <div className="">
          <b>Tên Sản Phẩm </b>
          <p>Số lượng sản phẩm: {number}</p>
        </div>
        <div className="flex">
          <div>
            <p onClick={handleDeleteProduct}>-</p>
          </div>
          <div>
            <p>{number}</p>
          </div>
          <div>
            <p onClick={handleAddProduct}>+</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductOfBasket;
