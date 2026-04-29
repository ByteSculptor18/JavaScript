import { renderCart } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { getCartQuantity } from "../data/cart.js";

renderCart();

document.querySelector('.js-checkout-header-middle-section').innerHTML =
    `Checkout (<a class="return-to-home-link" href="amazon.html">${getCartQuantity()} items</a>)`;