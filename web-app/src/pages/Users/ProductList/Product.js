import React, { useState, useEffect } from "react";
import { getProductById } from "../../../services/product.service";
import { addOrDeleteProductOfBasket } from "../../../services/basket.service";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../../components/LocalStorage/LocalStorage";
const ProductItem = ({ props }) => {
  const user = getItem("user");
  const accessToken = getItem("accessToken");
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductById(props.id);
        setProduct(result.data);
      } catch (error) {
        console.error(`Error fetching product with id ${props.id}`, error);
      }
    };

    fetchData();
  }, [props.id]);

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleDetailClick = (item) => {
    navigate(`/SanPham/${item.id}`);
  };
  const handleAddProductToBasket = async () => {
    try {
      await addOrDeleteProductOfBasket(
        user.id,
        accessToken.token,
        props.id,
        "add"
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h2>
        <b>Tên Sản phẩm: {product.name}</b>
      </h2>
      <p>
        Giá bán: <b>{product.cost}</b>
      </p>
      <div className="button-container flex justify-between">
        <button className="buy-button" onClick={handleAddProductToBasket}>
          Mua hàng
        </button>
        <button
          className="detail-button"
          onClick={() => handleDetailClick(product)}
        >
          Chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
