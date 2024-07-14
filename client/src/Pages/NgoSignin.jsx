import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';

function NGOSignIn() {
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
      const res = await axios.post('/api/ngoAuth/signin', formData, {
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
      navigate('/messFoodListing');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500'>
      <div className='bg-white p-10 rounded-lg shadow-xl w-full max-w-lg'>
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-600'>
          NGO Login
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={handleChange}
              className='mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <button
            disabled={loading}
            type='submit'
            className='w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <div className='text-center'>
            <span className='text-sm text-gray-600'>Don't have an account? </span>
            <Link to='/ngo-signup' className='text-sm text-blue-700 font-medium hover:underline'>Sign up</Link>
          </div>
          {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default NGOSignIn;
