// Initialize the cart or load from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(id, name, price) {
    const item = cart.find(product => product.id === id);
    if (item) {
        // If the item already exists in the cart, increase its quantity
        item.quantity++;
    } else {
        // If the item is not in the cart, add it
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

// Function to update the cart in localStorage and the cart display
function updateCart() {
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Get the cart items container and total display elements
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Update the cart item display
    if (cartItems && cartTotal) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name}</span> - $${item.price} x ${item.quantity}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        // Calculate the total price of the cart
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.innerText = total.toFixed(2);
    }
}

// Function to remove an item from the cart
function removeFromCart(id) {
    // Find the item index in the cart array
    const itemIndex = cart.findIndex(product => product.id === id);
    if (itemIndex !== -1) {
        // If item found, remove it from the cart array
        cart.splice(itemIndex, 1);
    }
    // Update the cart display after removal
    updateCart();
}

// Function to save cart data for checkout (if required)
function saveCartData() {
    document.getElementById('cart-data').value = JSON.stringify(cart);
}

// Initialize the cart display when the page loads
window.onload = updateCart;

// Carousel functionality
let slideIndex = 0;
showSlides();

// Function to display the carousel slides
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    // Hide all slides initially
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Move to the next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    // Show the current slide
    slides[slideIndex - 1].style.display = "block";
    // Change slide every 3 seconds
    setTimeout(showSlides, 3000);
}
    // Get elements
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');

    // Event listener for search button
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Here you can add actual search functionality, like filtering items, sending the query to an API, etc.
            alert('Search for: ' + query); // Just an example alert
        } else {
            alert('Please enter a search term.');
        }
    });

    // Optionally, allow pressing 'Enter' to trigger the search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

