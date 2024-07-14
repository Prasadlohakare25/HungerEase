import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MessInterFace = () => {
    const [foodListings, setFoodListings] = useState([]);
    const navigate = useNavigate();

    const fetchListings = async () => {
        try {
            const response = await axios.get('/api/food/getListing');
            setFoodListings(response.data);
            // console.log(foodListings);
        } catch (error) {
            console.error('Error fetching food listings:', error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleDelete = async (id) => {
        try {
            // console.log(id);
            const res = await axios.delete(`/api/food/deleteFoodListing/${id}`);
            if (res) {
                console.log("Food Listing Deleted Successfully");
            }
            //this will again reload the function and will give the updated list
            fetchListings();

        } catch (err) {
            console.log("Error while deleting" + err);
        }
    }

    return (
        <div className="py-5 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-10 text-center text-slate-800">Food Listings</h2>
                <div className="gap-8 flex flex-wrap justify-center align-middle">
                    {foodListings.length > 0 ? (
                        foodListings.map((listing, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <p className="text-gray-800 mb-4"><span className="font-semibold">Date:</span> {new Date(listing.cur_date).toLocaleDateString()}</p>
                                <p className="text-gray-800 mb-4"><span className="font-semibold">Number of Persons:</span> {listing.no_of_person}</p>
                                <p className="text-gray-800"><span className="font-semibold">Food Description:</span> {listing.food_desc}</p>
                                <button className='text-gray-100 px-4 py-2 bg-red-700 rounded-sm my-2' onClick={() => handleDelete(listing.id)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600">No food listings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessInterFace;
