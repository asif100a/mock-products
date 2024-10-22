import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CartSummary from '../Cart/CartSummary'
import Cart from '../Cart/Cart'
import Loader from '../UI/Loader'
import { Product } from '../../api/productsApi'

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
                    <div className='mb-8 flex flex-col justify-center items-center gap-3'>
                        <h1 className='text-4xl font-bold text-center'>Choose Your Favorite Products</h1>
                        <CartSummary />
                    </div>
                    <div className='grid grid-cols-4 gap-6 w-fit mx-auto'>
                        {
                            products?.map((product) => (
                                <Cart
                                    key={product?.id}
                                    product={product}
                                // handleAddToCart={handleAddToCart}
                                />
                            ))
                        }
                    </div>
                </section>
            </InfiniteScroll>
        </div>
    )
}

export default InfiniteScrollComponent
