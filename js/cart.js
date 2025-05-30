// JavaScript Document

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productName, productPrice) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Item added to cart!");
}

function updateCartDisplay() {
    const cart = getCart();
    const cartContainer = document.getElementById("cart-items");
    const totalItemsElement = document.getElementById("total-items");
    const grandTotalElement = document.getElementById("grand-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        if (totalItemsElement) totalItemsElement.textContent = "$0";
        if (grandTotalElement) grandTotalElement.textContent = "$25";
        return;
    }

    let itemsTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        itemsTotal += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="images/${getProductImage(item.name)}" alt="${item.name}" />
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="quantity-controls">
                    <label>Quantity</label>
                    <input type="number" value="${item.quantity}" min="0" 
                           onchange="updateQuantity('${item.name}', parseInt(this.value))" />
                </div>
                <div class="item-total">
                    <label>Total</label>
                    <span>$${itemTotal.toFixed(0)}</span>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">×</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    const shipping = 25;
    const grandTotal = itemsTotal + shipping;

    if (totalItemsElement) totalItemsElement.textContent = `$${itemsTotal.toFixed(0)}`;
    if (grandTotalElement) grandTotalElement.textContent = `$${grandTotal.toFixed(0)}`;
}

function removeFromCart(productName) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== productName);
    saveCart(cart);
    updateCartDisplay();
}

function updateQuantity(productName, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.name === productName);

    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productName);
            return;
        }
        item.quantity = newQuantity;
    }

    saveCart(cart);
    updateCartDisplay();
}

function getProductImage(productName) {

    const imageMap = {
        "Fender Mustang LT25 Amplifier": "fender_mustang_LT25.png",
        "Fender Tone Master Deluxe Reverb Blonde Amplifier": "fender_tone_master_blonde.png",
    };
    
    return imageMap[productName] || "placeholder.png";
}

function loadCart() {
    updateCartDisplay();
}


document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("cart-items")) {
        loadCart();
    }
});


function updateCartCountBadge() {
  const cart = getCart();
  const badge = document.getElementById("cart-count-badge");

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount > 0) {
    badge.textContent = itemCount;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}



