import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';

function MessSignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error, currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const res = await axios.post('/api/messAuth/signin', formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.data;
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/myListing');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className='bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 h-screen flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded-lg p-6 md:p-10 lg:p-12 w-full max-w-md'>
                <h1 className='font-semibold text-center text-2xl md:text-3xl text-gray-800 mb-6'>
                    Mess Login
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' name='email' onChange={handleChange} className='mt-1 border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type='password' id='password' name='password' onChange={handleChange} className='mt-1 border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <button disabled={loading} type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    <div className='flex justify-between items-center mt-4 text-sm'>
                        <span>Don't have an account?</span>
                        <Link to='/mess-signup' className='text-indigo-600 hover:text-indigo-500 font-medium'>Sign up</Link>
                    </div>
                    {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default MessSignIn;
