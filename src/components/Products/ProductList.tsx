import * as React from 'react'
import { Product, useGetProductsQuery } from '../../api/productsApi';
import InfiniteScrollComponent from '../InfiniteScroll/InfiniteScrollComponent';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addToCart, clearCart, removeFromCart } from '../../features/cart/cartSlice';

const ProductList: React.FC = () => {
  const [search, setSearch] = React.useState<string>('');
  const [count, setCount] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(10);
  const [hashMore, setHashMore] = React.useState<boolean>(true);

  const pages = Math.ceil(count / limit);

  React.useEffect(() => {
    const countData = async () => {
      try {
        const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products');
        setCount(data.length);
      }
      catch (err) {
        console.log(err);
      }
    };
    countData();
  }, []);

  // Fetch more data while scrolling
  const fetchMoreData = () => {
    if (limit < count) {
      // console.log('Pages:', pages);
      setLimit(pages * limit);
      // console.log("Limit", limit);
    }
    else {
      setHashMore(false);
      console.log("Limit", limit);
    }
  };

  // Fetch the product through RTK Query
  const { data: products = [], error, isLoading } = useGetProductsQuery({ limit });

  // Display data by searching
  let productsData = products;

  if(search) {
    productsData = productsData.filter(product => {
      const lowerCaseSearchText = search.toLocaleLowerCase();
      const lowerCaseProductTitle = product?.title.toLocaleLowerCase()
      return lowerCaseProductTitle.includes(lowerCaseSearchText);
    });
  }

  // Redux useDispatch hook
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
    if (cartItems.length > 0) {
      dispatch(clearCart());
    }
  };

  // Show product through search
  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearch(e.currentTarget.searchText.value);
  };


  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <p>And error occurred</p>
  }

  return (
    <>
      <InfiniteScrollComponent
        products={productsData}
        limit={limit}
        fetchMoreData={fetchMoreData}
        hashMore={hashMore}
        handleAddToCart={handleAddToCart}
        handleRemoveOneItem={handleRemoveOneItem}
        handleClearItems={handleClearItems}
        handleSearch={handleSearch}
      />
    </>
  )
}

export default ProductList
