import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signOutUserFailure, signOutUserSuccess, signOutUserStart } from '../redux/user/userSlice';

function Header() {
    // const { currentUser } = useSelector(state => state.user)
    const { loading, error, currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await fetch('api/ngoAuth/signout')//as for the get request there is by default
            const data = res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            navigate('/');
            dispatch(signOutUserSuccess(data));
        }
        catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    }
    return (
        <header className="bg-slate-900 shadow-md px-4 rounded-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Link to='/'>
                        <h1 className="text-image-bg text-4xl font-bold">HungerEase</h1>
                    </Link >
                </div>
                <div>
                    {currentUser ? (
                        <div className="flex items-center justify-between">
                            {/* <img
                                src={currentUser.user_name} // Replace with actual user profile picture URL
                                alt="User Profile"
                                className="h-8 w-8 rounded-full object-cover"
                            /> */}
                            {currentUser.category === 'mess' ? (
                                <Link to='/createListing'>
                                    <button className='mx-2 text-gray-200 text-xl'>
                                        Create Listing
                                    </button>
                                </Link>
                            ) : (
                                <p></p>
                            )

                            }
                            <a className='mx-2 md:mx-4 text-gray-200 text-xl'>
                                {currentUser.user_name.charAt(0).toUpperCase() + currentUser.user_name.substring(1)}
                            </a>
                            <button onClick={handleSignOut} className='ml-2 text-red-600 text-xl font-bold'>
                                Logout
                            </button>
                            {/* <span className="ml-2 text-gray-700">{user.user_name}</span> */}
                        </div>
                    ) : (
                        <Link to='/signIn'>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Sign In
                            </button>
                        </Link>
                    )}
                    {/* <Link to='/signIn'>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Sign In
                        </button>
                    </Link> */}
                </div>
            </div>
        </header >
    );
};

export default Header;
