import * as React from 'react';
import Cart from './Cart';
import CartSummary from './CartSummary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addToCart } from '../../features/cart/cartSlice';
import { Product } from '../../api/productsApi';

interface AllCartProps {
    products: Product[];
};

const AllCart: React.FC<AllCartProps> = ({ products, lastProductRef }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    return (
        <section className='py-8'>
            <div className='mb-8 flex flex-col justify-center items-center gap-3'>
                <h1 className='text-4xl font-bold text-center'>Choose Your Favorite Products</h1>
                <CartSummary />
            </div>
            <div className='grid grid-cols-5 gap-6 w-fit mx-auto'>
                {
                    products?.map((product, index) => (
                        <Cart 
                        key={product?.id} 
                        ref={index === products.length - 1 ? lastProductRef : null}
                        product={product} 
                        handleAddToCart={handleAddToCart} 
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default AllCart;