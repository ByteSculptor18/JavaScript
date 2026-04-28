export const cart = [];
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