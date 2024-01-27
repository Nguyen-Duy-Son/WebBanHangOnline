import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../../services/product.service';
import ProductItem from './Product';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = ({user}) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllProducts();
                setProducts(result);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchData();
    }, []);

    if (!products || products.length === 0) {
        return <div>No products found</div>;
    }

    const handleDetailClick = (item) => {
        navigate(`/SanPham/${item.id}`);
    };

    return (
        <div className="product-list-container">
            <p className="product-list-content shadow bg-stone-300 w-full h-full">
                <b>Sản Phẩm</b>
            </p>
            <div className="product-list">
                {products.map((item, index) => (
                    <div className="product-item" key={index} >
                        <ProductItem props={item} key={index}/>
                        <div className="button-container flex justify-between">
                            <button className="buy-button">Mua hàng</button>
                            <button className="detail-button" onClick={() => handleDetailClick(item)}>
                                Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
