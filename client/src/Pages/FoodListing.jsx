import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FoodListing = () => {
    const [foodDetails, setFoodDetails] = useState(null);
    const navigate = useNavigate()
    const { listingID } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`/api/ngoAuth/foodDetail/${listingID}`);
                setFoodDetails(response.data);
            } catch (error) {
                setError('Error fetching details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [listingID]);

    if (loading) {
        return <div className="text-center text-xl py-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-xl py-20">{error}</div>;
    }

    const handleDelete = async () => {
        try {
            console.log(listingID);
            const res = await axios.delete(`/api/food/deleteFoodListing/${listingID}`);
            if (res) {
                console.log("Food Listing Deleted Successfully");
            }
            navigate('/messFoodListing');
        } catch (err) {
            console.log("Error while deleting" + err);
        }
        // console.log(listingID);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 py-10 w-full">
            <div className="w-auto mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Food and Mess Details</h2>

                {foodDetails && (
                    <div className='flex justify-around font-serif text-lg'>
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Food Details</h3>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Date:</span> {foodDetails.cur_date.substring(0, 10)}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Food Description:</span> {foodDetails.food_desc}</p>
                                <p className="text-gray-700"><span className="font-semibold">Number of Persons:</span> {foodDetails.no_of_person}</p>
                            </div>
                                <button onClick={handleDelete} className='bg-red-600 px-3 py-1 my-2 rounded-sm text-white font-bold font-sans'>Delete Listing</button>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Mess Details</h3>
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                    <p className="text-gray-700"><span className="font-semibold">Username:</span> {foodDetails.user_name.charAt(0).toUpperCase() + foodDetails.user_name.substring(1)}</p>
                                    <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {foodDetails.email}</p>
                                    <p className="text-gray-700 mb-2"><span className="font-semibold">Phone Number:</span> {foodDetails.phone_number}</p>
                                    <p className="text-gray-700 mb-2"><span className="font-semibold">Address:</span> {foodDetails.address}</p>
                                </div>
                            </div>
                        </div>

                )}
                    </div>
        </div>
            );
};

export default FoodListing; 