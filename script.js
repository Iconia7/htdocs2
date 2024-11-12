let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span> - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(product => product.id === id);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
    updateCart();
}

// Function to save cart data to a hidden input in the checkout form
function saveCartData() {
    document.getElementById('cart-data').value = JSON.stringify(cart);
}

// Initialize cart display on page load
window.onload = updateCart;
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

