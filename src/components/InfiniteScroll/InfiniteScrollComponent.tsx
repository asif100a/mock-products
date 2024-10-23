import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CartSummary from '../Cart/CartSummary'
import Cart from '../Cart/Cart'
import Loader from '../UI/Loader'
import { Product } from '../../api/productsApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { addToCart, clearCart, removeFromCart } from '../../features/cart/cartSlice'
import SearchBar from '../Search/SearchBar'

interface InfiniteScrollComponentProps {
    products: Product[];
    limit: number;
    fetchMoreData: () => void;
    hashMore: boolean;
};

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({
    products,
    limit,
    fetchMoreData,
    hashMore
}) => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Add item to the cart
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    // Remove an item from the cart
    const handleRemoveOneItem = () => {
        if (cartItems.length > 0) {
            // Make an last id for removing the last item
            const lastItemId = cartItems[cartItems.length - 1].id;
            dispatch(removeFromCart(lastItemId));
        }
    };

    // Clear all items from the cart
    const handleClearItems = () => {
        if(cartItems.length > 0) {
            dispatch(clearCart());
        }
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={limit} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hashMore}
                loader={<Loader />}
                endMessage={
                    <div>
                        <p className='text-center'><b>No more products right now</b></p>
                    </div>
                }
            >
                <section className='py-8'>
                    <div className='w-fit mx-auto'>
                        <div className='mb-6 mx-auto'>
                            <h1 className='text-4xl font-bold text-center'>Choose Your Favorite Products</h1>
                            <div className='flex justify-between gap-6 mt-3'>
                                <SearchBar />
                                <CartSummary
                                    handleRemoveOneItem={handleRemoveOneItem}
                                    handleClearItems={handleClearItems}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-6 w-fit mx-auto'>
                            {
                                products?.map((product) => (
                                    <Cart
                                        key={product?.id}
                                        product={product}
                                        handleAddToCart={handleAddToCart}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </section>
            </InfiniteScroll>
        </div>
    )
}

export default InfiniteScrollComponent
