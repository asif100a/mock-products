'use client';
import * as React from 'react'

// Define the type for the product data
interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: object
};

const Cart: React.FC<{ product: Product }> = ({ product }) => {
    const {id, title, price, description, category,image, rating} = product;

    return (
        <div className="w-60 shadow-lg bg-secondary rounded-md flex flex-col justify-between p-3">
            <img
                src={image}
                alt=""
                className="w-full h-40 object-cover"
            />
            <div className="flex w-full items-center">
                <h2 className="font-semibold text-xl">{title}</h2>
            </div>

            <p className="text-text">
                {description.slice(0, 50)}...
            </p>

            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center gap-4 ">
                    <div>
                        {" "}
                        <p className="text-text text-[0.9rem]">Price : $25</p>{" "}
                    </div>
                </div>
                <button className="btn p-3 rounded border bg-black text-white hover:bg-blue-700 hover:text-white">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default Cart;