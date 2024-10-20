import * as React from 'react';
import Cart from './Cart';

// Define the type for the product data
interface Products {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: object
};

interface AllCartProps {
    products: Products[];
};

const AllCart: React.FC<AllCartProps> = ({ products }) => {
    return (
        <section className='py-8'>
            <h1 className='text-4xl font-bold text-center mb-8'>Choose Your Favorite Products</h1>
            <div className='grid grid-cols-5 gap-6 w-fit mx-auto'>
                {
                    products?.map(product => (
                        <Cart key={product?.id} product={product} />
                    ))
                }
            </div>
        </section>
    );
};

export default AllCart;