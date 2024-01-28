import React, { useState} from 'react';
import loginImg from '../../../assets/images/xay-dung-website-ban-hang.jpg';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/auth.service';
import { getUserByEmail } from '../../../services/user.service';
import {  getItem,setItem } from '../../../components/LocalStorage/LocalStorage';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        setIsSubmitting(true);
        try {
            const data = {
                email,
                password,
            };
            const dataSignIn = await login(data);
            const accessToken = dataSignIn.accessToken;
            setIsSubmitting(false);
            const response = await getUserByEmail(email);
            const user = response.data;
            setItem('user',user);
            setItem('accessToken', accessToken);
            alert('Login Successful');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
            setIsSubmitting(false);
            setIsError(true);
        }
    };
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/2 hidden sm:block">
                <img
                    className="w-full h-full object-contain object-center"
                    src={loginImg}
                    alt="Login Image"
                />
            </div>
            <div className="w-full sm:w-1/2 bg-gray-100 flex flex-col justify-center">
                <form className="max-w-md w-full mx-auto bg-white p-8 shadow-md rounded">
                    <h2 className="text-4xl font-bold text-center mb-6">
                        Sign In
                    </h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-lg font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="text-lg font-medium"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type={showPassword ? 'password' : 'text'} // Sử dụng trạng thái showPassword để quyết định kiểu dữ liệu đầu vào
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span class="fas fa-eye"></span>
                            </div>
                        </div>
                    </div>
                    <button
                        className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleSignIn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                    {isError && (
                        <p className="text-red-500 mt-4 text-sm text-center">
                            Login Failed. Please try again!
                        </p>
                    )}
                    <div className="flex justify-between mt-4">
                        <label className="flex items-center">
                            <input className="mr-2" type="checkbox" />
                            Remember Me
                        </label>
                        <div className="ml-auto">
                            <button
                                className="text-indigo-500 no-underline"
                                type="button"
                                onClick={() => navigate('/SignUp')}
                            >
                                Create an account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}