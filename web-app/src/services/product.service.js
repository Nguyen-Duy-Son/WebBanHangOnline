import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/products');
    const productsData = response.data.data || [];
    
    // Add image path to each product
    const products = productsData.map((product) => {
        product.image = `http://localhost:5000/${product.image}`;
        return product;
      });
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  

export const getProductById = async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/v1/products/${id}`
        );
        const product = response.data;;
        product.data.image = `http://localhost:5000/${product.data.image}`;
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

