import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../services/product.service';
import { getItem } from "../../../components/LocalStorage/LocalStorage";
import './ProductDetail.css';
import ProductList from './ProductList';
const ProductDetail = () => {
    // const user = getItem('user');
    // const accessToken = getItem('accessToken');
    // console.log(user);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProductById(id);
                setProduct(result.data);
            } catch (error) {
                console.error(`Error fetching product with id ${id}`, error);
            }
        };

        fetchData();
    }, [id]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <div>
                <div className='product_item-title'>
                    <p className='product-list-content shadow bg-stone-300 w-full h-full'><b>Thông Tin Chi Tiết Sản Phẩm</b></p>
                </div>
                <div className="product_item-detail flex">
                    <div className="product_item-detail-img">
                        <img
                            className="w-1/5"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="product_item-detail-content">
                        <p>
                            Tên Sản phẩm: <b>{product.name}</b>
                        </p>
                        <p>
                            Giá bán: <b>{product.cost}</b>
                        </p>
                        <p>
                            Loại: <b>{product.nameBrand}</b>
                        </p>
                        <p>
                            Nếu bạn có nhu cầu mua sản phẩm hãy nhẫn vào mua
                            hàng để thêm hàng vào giỏ hàng nhé! Shop cảm ơn bạn
                            nhiều !
                        </p>
                        <button className="buy-button buy_button-detail">
                            Mua hàng
                        </button>
                    </div>
                </div>
            </div>
            <div className='product_item-list'>
                <div className='product_item-title'>
                    <p className='product-list-content shadow bg-stone-300 w-full h-full'><b>Sản Phẩm Khác</b></p>
                </div>
                <div className='product_item-list-'>
                    <ProductList></ProductList>
                </div>
            </div>
            
        </div>
    );
};

export default ProductDetail;
