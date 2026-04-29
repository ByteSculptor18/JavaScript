let cart = [];

// Load cart from localStorage
function loadCartFromStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    cart = Array.isArray(storedCart) ? storedCart : [];
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart once
loadCartFromStorage();

// Get current cart (always fresh)
export function getCart() {
    loadCartFromStorage();
    return cart;
}

// Add to cart
export function showAddedToCartMessage(productId, quantity) {
    loadCartFromStorage();

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ 
            productId: productId, 
            quantity: quantity,
            deliveryOptions: '1' // default delivery option
        });
    }

    saveCartToStorage();
}

export function removeFromCart(productId) {
    loadCartFromStorage();

    cart = cart.filter(item => item.productId !== productId);

    saveCartToStorage();
}

// Get total quantity (useful for header)
export function getCartQuantity() {
    loadCartFromStorage();

    return cart.reduce((total, item) => total + item.quantity, 0);
}