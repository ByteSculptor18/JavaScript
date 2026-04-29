import { getCart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();
const deliveryDate = today.add(7, 'day').format('dddd, MMMM D');

// 🔥 Render Cart
function renderCart() {
    const cart = getCart();

    let cartSummaryHTML = '';

    cart.forEach(item => {
        const productId = item.productId;
        const quantity = item.quantity;

        const matchingProduct = products.find(product => product.id === productId);

        if (!matchingProduct) return;

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container" data-product-id="${matchingProduct.id}">
            
            <div class="delivery-date">
                Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>

                    <div class="product-price">
                        ${formatCurrency(matchingProduct.price)}
                    </div>

                    <div class="product-quantity">
                        Quantity: 
                        <span class="quantity-label">${quantity}</span>

                        <span class="update-quantity-link link-primary">
                            Update
                        </span>

                        <span class="delete-quantity-link link-primary js-delete-item"
                        data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    <div class="delivery-option">
                        <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                ${deliveryDate}
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });


document.querySelector('.js-order-summary')
.addEventListener('click', (e) => {

    const deleteBtn = e.target.closest('.js-delete-item');
    if (!deleteBtn) return;

    const productId = deleteBtn.getAttribute('data-product-id');

    console.log('Deleting product with id:', productId);

    removeFromCart(productId);

    renderCart();
});

const cartSummaryElement = document.querySelector('.js-order-summary');
if (cartSummaryElement) {
    cartSummaryElement.innerHTML = cartSummaryHTML || '<div>Your cart is empty.</div>';
}
}

renderCart();