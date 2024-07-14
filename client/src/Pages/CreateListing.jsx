import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateListing = () => {
    const [formData, setFormData] = useState({
        no_of_person: '',
        food_desc: ''
    });

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format


        const dataToSend = {
            cur_date: today,
            no_of_person: formData.no_of_person,
            food_desc: formData.food_desc,
            mess_id: currentUser.id
        };

        try {
            const response = await axios.post('/api/food/createFoodListing', dataToSend);
            console.log('Listing created successfully:', response.data);
            navigate('/myListing');
        } catch (error) {
            console.error('Error creating listing:', error);
            // Handle error, show error message
        }
    };

    return (
        <div className="py-5 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Food Listing</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Number of Persons</label>
                        <input
                            type="number"
                            name="no_of_person"
                            value={formData.no_of_person}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Description</label>
                        <textarea
                            name="food_desc"
                            value={formData.food_desc}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded"
                            rows={4}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Create Listing
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateListing;
