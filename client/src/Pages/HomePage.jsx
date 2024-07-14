import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625481710487-b93a4142d0a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHVuZ2VyfGVufDB8fDB8fHww')" }}>
                <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">    
                    <h1 className="text-white text-5xl md:text-7xl font-bold opacity-80 shadow-lg shadow-black border-2 border-slate-950">HungerEase</h1> 
                    <p className="text-white text-xl md:text-2xl mt-4">Together, we can remove hunger from society</p>
                    <Link to="/signIn">
                        <button className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600">
                            Join Us
                        </button>
                    </Link>
                    <button></button>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 bg-gray-100 text-center">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
                    <p className="mt-4 text-gray-600 text-lg">
                        At HungerEase, our mission is to eradicate hunger from society by providing nutritious meals to those in need. We believe that no one should go to bed hungry, and together, we can make a difference.
                    </p>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800">Our Impact</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1625481710487-b93a4142d0a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGRpc3RyaWJ1dGlvbiUyMHRvJTIwcG9vcnxlbnwwfHwwfHx8MA%3D%3D" alt="Food Distribution" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800">Food Distribution</h3>
                                <p className="mt-4 text-gray-600">We set a bridge connecting NGO's to local mess which helps to eradicate hunger from our society</p>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://plus.unsplash.com/premium_photo-1683140509470-63a993b2906f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBvb3IlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D" alt="Volunteer Programs" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800">Volunteer Programs</h3>
                                <p className="mt-4 text-gray-600">Join our volunteer programs by connecting your mess to help us make a tangible difference in the community.</p>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1623399785194-903567d1e0e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvb3IlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D" alt="Happy Children" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800">Happy Children</h3>
                                <p className="mt-4 text-gray-600">Our efforts have brought smiles to the faces of countless children. Let's continue to spread joy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-blue-500 text-white text-center">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold">Get Involved</h2>
                    <p className="mt-4 text-lg">Join us in our mission to eradicate hunger. Whether you donate, volunteer, or spread the word, every action counts.</p>
                    <button className="mt-8 px-6 py-3 bg-white text-blue-500 text-lg rounded-full hover:bg-gray-100">
                        Learn More
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
