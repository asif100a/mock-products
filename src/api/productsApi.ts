import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Rating {
    rate: number,
    count: number
};

export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating
};

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com/'}),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products',
        })
    })
});

export const {useGetProductsQuery} = productsApi;