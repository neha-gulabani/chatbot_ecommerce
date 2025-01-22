import React from 'react';
import Chatbot from './ChatBot';
import headphoneImg from '../assets/headphone_image.jpg'
import watchImg from '../assets/watch.jpg'
import powerbankImg from '../assets/powerbank.jpg'

const Ecommerce = ({ files }) => {

    const products = [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: '$299.99',
            description: 'High-quality wireless headphones with noise cancellation',
            image: headphoneImg
        },
        {
            id: 2,
            name: 'Smart Fitness Watch',
            price: '$199.99',
            description: 'Track your fitness goals with our advanced smartwatch',
            image: watchImg
        },
        {
            id: 3,
            name: 'Portable Power Bank',
            price: '$49.99',
            description: '20000mAh battery capacity for all your devices',
            image: powerbankImg
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <nav className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-bold text-blue-600">TechStore</div>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>


            <div className="bg-blue-500 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to TechStore</h1>
                    <p className="text-xl">Discover the latest in technology and gadgets</p>
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-600">{product.price}</span>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <Chatbot files={files} />
        </div>
    );
};

export default Ecommerce;