import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NgoFoodListing = () => {
    const [foodListings, setFoodListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('/api/ngoAuth/messFoodListing');
                setFoodListings(response.data);
                // console.log(foodListings);
            } catch (error) {
                console.error('Error fetching food listings:', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div className="py-5 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-10 text-center text-slate-800">Food Listings</h2>
                <div className="gap-8 flex flex-wrap justify-center align-middle">
                    {foodListings.length > 0 ? (
                        foodListings.map((listing, index) => (
                            <Link to={`/foodListing/${listing.id}`} key={index}>
                                <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <p className="text-gray-800 mb-4"><span className="font-semibold">Date:</span> {new Date(listing.cur_date).toLocaleDateString()}</p>
                                    <p className="text-gray-800 mb-4"><span className="font-semibold">Number of Persons:</span> {listing.no_of_person}</p>
                                    <p className="text-gray-800"><span className="font-semibold">Food Description:</span> {listing.food_desc}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600">No food listings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NgoFoodListing;
