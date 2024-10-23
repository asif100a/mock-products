import { Product } from "../../api/productsApi";
import persistedCartReducer, { addToCart, CartItem, clearCart, removeFromCart } from "../../features/cart/cartSlice";

describe('cartSlice', () => {
    let initialState = {
        items: [] as CartItem[],
        totalQuantity: 0,
        totalPrice: 0,
        _persist: {
            rehydrated: true, // mock value
            version: 1, // mock version
        }
    };

    const product: Product = {
        id: 1,
        title: 'Product A',
        price: 10,
        description: '',
        category: '',
        image: '',
        rating: {
            rate: 4,
            count: 100,
        }
    };

    it('should add product to the cart', () => {
        const newState = persistedCartReducer(initialState, addToCart(product));

        expect(newState.items).toHaveLength(1);
        expect(newState.totalQuantity).toBe(1);
        expect(newState.totalPrice).toBe(10);
        expect(newState.items[0].id).toBe(product.id);
        expect(newState.items[0].quantity).toBe(1);
    });

    it('should increase quantity if product is added again', () => {
        const stateWithOneItem = persistedCartReducer(initialState, addToCart(product));
        const newState = persistedCartReducer(stateWithOneItem, addToCart(product));

        expect(newState.items).toHaveLength(1);
        expect(newState.totalQuantity).toBe(2);
        expect(newState.totalPrice).toBe(20);
        expect(newState.items[0].quantity).toBe(2);
    });

    it('should remove a product from the cart', () => {
        initialState = {
            items: [{...product, quantity: 2}],
            totalQuantity: 2,
            totalPrice: 20,
            _persist: {
                rehydrated: true,
                version: 1,
            }
        };

        const newState = persistedCartReducer(initialState, removeFromCart(product.id));
        expect(newState.items).toHaveLength(0);
        expect(newState.totalQuantity).toBe(0);
        expect(newState.totalPrice).toBe(0);
    });

    it('should clear the cart', () => {
        initialState = {
            items: [{...product, quantity: 2}],
            totalQuantity: 2,
            totalPrice: 20,
            _persist: {
                rehydrated: true,
                version: 1,
            }
        };

        const newState = persistedCartReducer(initialState, clearCart());
        expect(newState.items).toHaveLength(0);
        expect(newState.totalQuantity).toBe(0);
        expect(newState.totalPrice).toBe(0);
    })
})