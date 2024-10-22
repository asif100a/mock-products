import * as React from 'react'
import { useGetProductsQuery } from '../../api/productsApi';
import AllCart from '../Cart/AllCart';

const ProductList: React.FC = () => {
  const {data: products, error, isLoading} = useGetProductsQuery();
  const observer = React.useRef<IntersectionObserver | null>(null);

  const lastProductRef = React.useCallback((node) => {
    if(isLoading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if(node) observer.current.observe(node);
  }, [isLoading])

  if(isLoading) {
    return <p>Loading....</p>
  }
  if(error) return console.log(error);

  return (
    <AllCart products={products} lastProductRef={lastProductRef} />
  )
}

export default ProductList
