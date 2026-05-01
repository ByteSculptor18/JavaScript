import { addToCart, getCart, resetCart } from '../data/cart.js';

describe('test Suite: addToCart', () => {

    beforeEach(() => {
        resetCart(); 
    });

    it('should add a new product to the cart', () => {
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955', 1);

        expect(getCart().length).toBe(1);
        expect(getCart()[0].productId).toBe('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(getCart()[0].quantity).toBe(1);
    });

    it('should increase quantity if product already exists in cart', () => {
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955', 1);
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955', 2);

        expect(getCart().length).toBe(1);         
        expect(getCart()[0].quantity).toBe(3);     
    });

});