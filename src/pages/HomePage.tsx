'use client';
import * as React from 'react';
import ProductList from '../components/Products/ProductList';
// import axios from 'axios';
// import AllCart from '../components/Cart/AllCart';

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

const HomePage: React.FC = () => {
    // const [products, setProducts] = React.useState<Products[]>([]);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get<Products[]>(`https://fakestoreapi.com/products`);
    //         setProducts(response.data);
    //     }
    //     catch(error) {
    //         console.log(error);
    //     }
    // };

    // React.useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <main>
            {/* <AllCart products={products} /> */}
            <ProductList />
        </main>
    );
};

export default HomePage;