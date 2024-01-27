import axios from "axios";
export const getBasketByUserId = async(userId,token)=>{
    
    try{
        const response = await axios.get(`http://localhost:5000/api/v1/baskets/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error.message);
        throw error;
    }
}
export const addOrDeleteProductOfBasket = async (userId, token, productId, status) => {
    console.log(token);
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/baskets/product`, {
            userId: `${userId}`,
            productId: `${productId}`,
            status: `${status}`
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
export const createBasketOfUser = async (userId, token) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/baskets`, {
            userId: `${userId}`,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}