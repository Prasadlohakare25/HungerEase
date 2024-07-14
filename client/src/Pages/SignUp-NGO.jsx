import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupNGO = () => {
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
            const response = await axios.post('/api/ngoAuth/signup', formData);
            console.log('Sign up successful:', response.data);
            // Redirect or show success message
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error, show error message
        }
        navigate('/ngo-signin')
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500'>
            <div className='bg-white p-10 rounded-lg shadow-xl w-full max-w-lg'>
                <h2 className='text-3xl font-bold text-center mb-6 text-blue-600'>NGO Sign Up</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupNGO;
