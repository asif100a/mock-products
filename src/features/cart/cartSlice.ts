import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product} from '../../api/productsApi';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// Type Definition
interface CartItem extends Product {
    quantity: number
};
interface CartState {
    items: CartItem[],
    totalQuantity: number,
    totalPrice: number,
};

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem) {
                existingItem.quantity += 1;
            }
            else{
                state.items.push({...action.payload, quantity: 1});
            }

            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(item => item.id === action.payload);

            if(existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

const persistConfig = {
    key: 'cart',
    storage,
};

export const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);
export default persistedCartReducer;