import axios from "axios";
export const getAllBrands = async()=>{
    try{
        const response = await axios.get('http://localhost:5000/api/v1/brands');
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
// export const getAllBrandById = async()=>{
//     try{
//         const response = await axios.get('http://localhost:5000/api/v1/brands');
//         console.log(response.data);
//         return response.data;
//     }
//     catch(error){
//         console.log(error);
//         throw error;
//     }
// }