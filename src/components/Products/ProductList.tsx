import * as React from 'react'
import { Product, useGetProductsQuery } from '../../api/productsApi';
import InfiniteScrollComponent from '../InfiniteScroll/InfiniteScrollComponent';
import axios from 'axios';

const ProductList: React.FC = () => {
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
  }, [])

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

  const { data: products = [], error, isLoading } = useGetProductsQuery({ limit });


  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <p>And error occurred</p>
  }

  return (
    <>
      <InfiniteScrollComponent
        products={products}
        limit={limit}
        fetchMoreData={fetchMoreData}
        hashMore={hashMore}
      />
    </>
  )
}

export default ProductList
