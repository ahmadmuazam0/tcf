// Shopping Cart State
let cart = [];

// Load cart from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('nutribites_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
});

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('nutribites_cart', JSON.stringify(cart));
}

// Toggle Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Add Item
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    
    // Open cart to show user it was added
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar.classList.contains('open')) {
        toggleCart();
    }
}

// Change Quantity
function changeQuantity(id, delta) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity goes to 0
        }
        saveCart();
        updateCartUI();
        
        // Also update checkout summary if we are on the checkout page
        if (window.location.pathname === '/checkout') {
            updateCheckoutSummary();
        }
    }
}

// Update the Cart Sidebar UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartCount || !cartItemsContainer) return; // Prevent errors on pages without cart UI

    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update Items List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        checkoutBtn.style.display = 'none';
        cartTotalPrice.textContent = 'Rs. 0';
        return;
    }

    checkoutBtn.style.display = 'block';
    let itemsHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price}</p>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    cartTotalPrice.textContent = `Rs. ${total}`;
}

// Update Checkout Page Summary
function updateCheckoutSummary() {
    const checkoutItemsContainer = document.getElementById('checkout-cart-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    
    if (!checkoutItemsContainer) return;

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>No items in cart.</p>';
        checkoutTotalPrice.textContent = 'Rs. 0';
        return;
    }

    let itemsHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-info">
                    <h4>${item.name} x ${item.quantity}</h4>
                    <p>Rs. ${item.price * item.quantity}</p>
                </div>
            </div>
        `;
    });

    checkoutItemsContainer.innerHTML = itemsHTML;
    checkoutTotalPrice.textContent = `Rs. ${total}`;
}
