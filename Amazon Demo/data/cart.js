let cart = [];

function loadCartFromStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    cart = Array.isArray(storedCart) ? storedCart : [];
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

loadCartFromStorage();

export function getCart() {
    return cart;
}

export function addToCart(productId, quantity) {
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }

    saveCartToStorage();
}

export function removeFromCart(productId) {
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }

    saveCartToStorage();
}

// New: update quantity of an existing cart item
export function updateCartQuantity(productId, newQuantity) {
    // Guard: quantity must be a positive whole number
    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
        console.warn(`Invalid quantity: ${newQuantity}. Must be a positive integer.`);
        return;
    }

    const item = cart.find(item => item.productId === productId);

    if (!item) {
        console.warn(`Product ${productId} not found in cart.`);
        return;
    }

    item.quantity = newQuantity;
    saveCartToStorage();
}

// New: update the selected delivery option for a cart item
export function updateDeliveryOption(productId, deliveryOptionId) {
    const item = cart.find(item => item.productId === productId);

    if (!item) {
        console.warn(`Product ${productId} not found in cart.`);
        return;
    }

    item.deliveryOptionId = deliveryOptionId;
    saveCartToStorage();
}

export function getCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Removes 1 quantity; fully removes item if quantity reaches 0
export function decrementCartItem(productId) {
    const item = cart.find(item => item.productId === productId);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        // quantity is 1, so remove the item entirely
        const index = cart.findIndex(item => item.productId === productId);
        cart.splice(index, 1);
    }

    saveCartToStorage();
}