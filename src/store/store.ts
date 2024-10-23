import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";
import persistedCartReducer from "../features/cart/cartSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

// persist configuration
const persistConfig = {
    key: 'cart',
    storage
};

// Wrap the cart reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, persistedCartReducer);

export const store = configureStore({
    reducer: {
        cart: persistedReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(productsApi.middleware),
});

// Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;