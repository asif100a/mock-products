# Mock-Products

## Project Overview

This project is a simple e-commerce product list application built using **React**, **TypeScript**, and **RTK Query**. It allows users to view a list of products with infinite scrolling, search for products, and manage a shopping cart. The cart data is persisted using **Redux Persist** to ensure it remains intact after page refreshes.

The Live Link: [Mock-Products](https://mock-products.vercel.app/)

### Key Features:

1. **Product Listing with Infinite Scroll**: 
   - Fetch products from the [FakeStore API](https://fakestoreapi.com/products) using RTK Query.
   - Load more products dynamically as the user scrolls.
   
2. **Search Functionality**:
   - Search bar to filter the product list dynamically based on the search term.

3. **Cart Management**:
   - Add products to the cart, with the cart summary showing the total items and total price.
   - Cart state is persisted across sessions using **Redux Persist**.

4. **Responsive Design**:
   - Mobile-friendly design that adapts to different screen sizes.

## Steps to Run the App Locally

### Prerequisites:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation Instructions:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/asif100a/mock-products
   ```

2. **Install dependencies**:
  ```bash
  npm install
 # or
 yarn install
  ```

3. **Run the application**:
  ```bash
  npm start
 # or
 yarn start
 ```


