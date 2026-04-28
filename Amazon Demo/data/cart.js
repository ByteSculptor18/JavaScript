export let cart = [];
export function showAddedToCartMessage(productId, quantity) {
    let found = false;

        cart.forEach(item => {
            if (item.productId === productId) {
                item.quantity += quantity;
                found = true;
            }
        });

        if (!found) {
            cart.push({
                productId: productId,
                quantity: quantity
            });
        }

        let totalQuantity = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity')
            .innerHTML = totalQuantity;

        console.log(cart);
}


export function removeFromCart(productId) {
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
}
