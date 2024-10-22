import * as React from 'react'
import { useGetProductsQuery } from '../../api/productsApi';
import AllCart from '../Cart/AllCart';
import Loader from '../UI/Loader';
import InfiniteScrollComponent from '../InfiniteScroll/InfiniteScrollComponent';
import axios from 'axios';

const ProductList: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [hashMore, setHashMore] = React.useState(true);

  const pages = Math.ceil(count / limit);

  React.useEffect(() => {
    const countData = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        setCount(data.length);
      }
      catch (err) {
        console.log(err);
      }
    };
    countData();
  }, [])

  const fetchMoreData = () => {
    if (limit < count) {
      console.log('Pages:', pages);
      setLimit(pages * limit);
      console.log("Limit", limit);
    }
    else {
      setHashMore(false);
    }
  };

  const { data: products, error, isLoading } = useGetProductsQuery({ limit });


  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) return console.log(error);

  return (
    <>
      <InfiniteScrollComponent
        products={products}
        limit={limit}
        fetchMoreData={fetchMoreData}
        hashMore={hashMore}
      />

      {/* <AllCart products={products} />
      <Loader /> */}
    </>
  )
}

export default ProductList
