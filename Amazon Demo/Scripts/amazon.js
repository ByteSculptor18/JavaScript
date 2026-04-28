import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
/*const products = [
{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: { stars: 4.5, count: 87 },
    price: 1090
},
{
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: { stars: 4, count: 127 },
    price: 2095
},
{
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt 2-Pack - Teal',
    rating: { stars: 4.5, count: 56 },
    price: 799
},
{
    image: 'images/products/black-2-slot-toaster.jpg',
    name: 'Black 2-Slot Toaster',
    rating: {
        stars: 5,
        count: 2197
    },
    price: 1899
}
];*/

let productsHTML = '';

products.forEach(product => {
    productsHTML += `
    <div class="product-container">

        <div class="product-image-container">
            <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            $${(product.price / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart" style="opacity: 0;">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
        </button>

    </div>`;
});

// Debug check
console.log(productsHTML);

// Render to page
const grid = document.querySelector('.js-products-grid');

if (grid) {
    grid.innerHTML = productsHTML;
} else {
    console.error('Grid not found!');
}


document.querySelectorAll('.js-add-to-cart')
.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        const quantity = parseInt(button
            .closest('.product-container')
            .querySelector('select').value);

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

        // Update total cart UI
        let totalQuantity = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity')
            .innerHTML = totalQuantity;

        console.log(cart);
    });
});
