'use client';
import * as React from 'react'
import { FaStar } from 'react-icons/fa';

// Define the type for the product data
interface Rating {
    rate: number,
    count: number
};

interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating,
};

interface CartProps {
    product: Product;
    handleAddToCart: (product: Product) => void;
};

const Cart: React.FC<CartProps> = ({ product, handleAddToCart }) => {
    const { title, price, description, category, image, rating } = product;

    return (
        <div className="w-60 shadow-lg bg-secondary rounded-md flex flex-col gap-2 justify-between p-3">
            <img
                src={image}
                alt=""
                className="w-full h-40 object-cover rounded-md"
            />
            <a className="flex w-full items-center hover:underline" href='#'>
                <h2 className="font-semibold text-xl">{title.slice(0, 30)}</h2>
            </a>

            <p className="text-text">
                {description.slice(0, 50)}...
            </p>

            <div className='flex justify-between'>
                <span className='bg-green-100 px-3 py-1 rounded-md'>{category}</span>

                <p className='flex gap-2 items-center'>
                    <span className='text-orange-400'><FaStar /></span>
                    <span>{rating.rate}</span>
                </p>
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-text text-[0.9rem]">Price : ${price}</p>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="btn p-3 rounded border bg-black text-white hover:bg-blue-700 hover:text-white"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default Cart;