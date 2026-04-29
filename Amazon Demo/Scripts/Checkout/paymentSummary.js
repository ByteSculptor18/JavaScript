import { getCart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    const cart = getCart();

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        productPriceCents += product.price * item.quantity;

        const deliveryOption = deliveryOptions.find(
            option => option.id === item.deliveryOptionId
        ) || deliveryOptions[0]; // ← fallback to first (FREE) option

        shippingPriceCents += deliveryOption.price;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = Math.round(totalBeforeTaxCents * 0.1);
    const totalCents = totalBeforeTaxCents + taxCents;

    // ✅ Bug 1 fix — cart.length = unique products, not total quantity
    const uniqueProductCount = cart.length;

    const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${uniqueProductCount}):</div>
        <div class="payment-summary-money">${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping & handling:</div>
        <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>`;

    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    if (paymentSummaryElement) {
        paymentSummaryElement.innerHTML = paymentSummaryHTML;
    }
}