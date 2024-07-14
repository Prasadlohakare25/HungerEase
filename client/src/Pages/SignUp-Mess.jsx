import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupMess = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        address: '',
        phone_number: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/messAuth/signup', formData);
            console.log('Sign up successful:', response.data);
            // Redirect or show success message
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error, show error message
        }
        navigate('/mess-signin');
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 lg:p-12 w-full max-w-md">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">Mess Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link to='/mess-signin' className='text-indigo-600 hover:text-indigo-500 font-medium'>Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupMess;
