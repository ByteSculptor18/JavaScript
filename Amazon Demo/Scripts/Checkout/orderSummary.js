import { getCart, removeFromCart, updateCartQuantity, updateDeliveryOption, decrementCartItem } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderCart() {
    const cart = getCart();
    let cartSummaryHTML = '';

    cart.forEach(item => {
        const productId = item.productId;
        const quantity = item.quantity;

        const matchingProduct = products.find(product => product.id === productId);
        if (!matchingProduct) return;

        function deliveryOptionsHTML() {
            return deliveryOptions.map(option => {
                const deliveryDate = dayjs()
                    .add(option.deliveryDays, 'day')
                    .format('dddd, MMMM D');
                const priceText = option.price === 0
                    ? 'FREE Shipping'
                    : formatCurrency(option.price);

                const isChecked = option.id === item.deliveryOptionId ? 'checked' : '';

                return `
                <div class="delivery-option">
                    <input type="radio" ${isChecked}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                        data-product-id="${matchingProduct.id}"
                        data-delivery-option-id="${option.id}">
                    <div>
                        <div class="delivery-option-date">${deliveryDate}</div>
                        <div class="delivery-option-price">${priceText}</div>
                    </div>
                </div>`;
            }).join('');
        }

        const selectedDeliveryOption = deliveryOptions.find(
            option => option.id === item.deliveryOptionId
        ) || deliveryOptions[0];

        const deliveryDate = dayjs()
            .add(selectedDeliveryOption.deliveryDays, 'day')
            .format('dddd, MMMM D');

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container" data-product-id="${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryDate}
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">${formatCurrency(matchingProduct.price)}</div>
                    <div class="product-quantity">
                        Quantity:
                        <span class="quantity-label js-quantity-label" 
                            data-product-id="${matchingProduct.id}">
                            ${quantity}
                        </span>
                        <input class="quantity-input js-quantity-input" 
                            type="number" min="1"
                            value="${quantity}"
                            data-product-id="${matchingProduct.id}"
                            style="display: none; width: 50px;">
                        <span class="update-quantity-link link-primary js-update-item"
                            data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <span class="save-quantity-link link-primary js-save-item"
                            data-product-id="${matchingProduct.id}"
                            style="display: none;">
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-item"
                            data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionsHTML()}
                </div>
            </div>
        </div>`;
    });

    const cartSummaryElement = document.querySelector('.js-order-summary');
    if (cartSummaryElement) {
        cartSummaryElement.innerHTML = cartSummaryHTML || '<div>Your cart is empty.</div>';
    }

    // ✅ Always update payment summary after cart renders
    renderPaymentSummary();
}

document.querySelector('.js-order-summary').addEventListener('click', (e) => {

    const deleteBtn = e.target.closest('.js-delete-item');
    if (deleteBtn) {
        const productId = deleteBtn.getAttribute('data-product-id');
        decrementCartItem(productId);
        renderCart(); // ✅ renderPaymentSummary called inside renderCart
        return;
    }

    const updateBtn = e.target.closest('.js-update-item');
    if (updateBtn) {
        const productId = updateBtn.getAttribute('data-product-id');
        const container = document.querySelector(`.js-cart-item-container[data-product-id="${productId}"]`);
        container.querySelector('.js-quantity-label').style.display = 'none';
        container.querySelector('.js-quantity-input').style.display = 'inline';
        container.querySelector('.js-update-item').style.display = 'none';
        container.querySelector('.js-save-item').style.display = 'inline';
        return;
    }

    const saveBtn = e.target.closest('.js-save-item');
    if (saveBtn) {
        const productId = saveBtn.getAttribute('data-product-id');
        const container = document.querySelector(`.js-cart-item-container[data-product-id="${productId}"]`);
        const newQuantity = parseInt(container.querySelector('.js-quantity-input').value);
        updateCartQuantity(productId, newQuantity);
        renderCart(); // ✅ renderPaymentSummary called inside renderCart
        return;
    }

    const deliveryInput = e.target.closest('.delivery-option-input');
    if (deliveryInput) {
        const productId = deliveryInput.getAttribute('data-product-id');
        const deliveryOptionId = deliveryInput.getAttribute('data-delivery-option-id');
        updateDeliveryOption(productId, deliveryOptionId);
        renderCart(); // ✅ renderPaymentSummary called inside renderCart
    }
});