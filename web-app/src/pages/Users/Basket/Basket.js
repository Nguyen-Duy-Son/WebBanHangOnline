import React, { useState, useEffect } from 'react';
import { getBasketByUserId } from '~/services/basket.service';
import ProductOfBasket from './ProductOfBasket';
import {  getItem } from '../../../components/LocalStorage/LocalStorage';
const Basket = () => {
    const user = getItem('user');
    const accessToken = getItem('accessToken');
    const [products,setProuducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBasketByUserId(user.id,accessToken.token);
                setProuducts(result.data.purchasedProducts);
                console.log("productsOfBasket",products);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchData();
    }, [user.id]);
    if (!products || products.length === 0) {
        return <div>No products found</div>;
    }
    return (
        <div className="product-list-container">
            <p className="product-list-content shadow bg-stone-300 w-full h-full">
                <b>Sản Phẩm Ở Giỏ Hàng</b>
            </p>
            {products &&<div className="">
                {products.map((item, index) => (
                    <ProductOfBasket props={item} key={index}/>
                ))}
            </div>}
            
        </div>
    );
};
export default Basket;