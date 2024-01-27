import React, { useState, useEffect } from 'react';
import { getProductById } from '../../../services/product.service';

const ProductItem = ({ props }) => {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProductById(props.id);
                setProduct(result.data);
            } catch (error) {
                console.error(
                    `Error fetching product with id ${props.id}`,
                    error,
                );
            }
        };

        fetchData();
    }, [props.id]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-item">
            <img src={product.image} alt={product.name} />
            <h2><b>Tên Sản phẩm: {product.name}</b></h2>
            <p>Giá bán: <b>{product.cost}</b></p>
            
        </div>
    );
};

export default ProductItem;
