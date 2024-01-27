import axios from 'axios';

export const getUserById = async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/v1/users/${id}`
        );
        const user = response.data;;
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/v1/users/email?email=${email}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

