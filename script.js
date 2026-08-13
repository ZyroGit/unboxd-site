// Un-Boxd — site logic
// You should NOT need to edit this file. To change products, edit products-data.js

document.getElementById("year").textContent = new Date().getFullYear();

function waLink(message) {
  const num = (typeof STORE_SETTINGS !== "undefined" && STORE_SETTINGS.whatsappNumber) || "";
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

// Footer WhatsApp / Instagram links
document.getElementById("whatsapp-link").href = waLink("Hi Un-Boxd! I'd like to know more about your boxes.");
const igHandle = (typeof STORE_SETTINGS !== "undefined" && STORE_SETTINGS.instagramHandle) || "";
document.getElementById("instagram-link").href = `https://instagram.com/${igHandle}`;

// Render product grid
const grid = document.getElementById("product-grid");

function renderProducts(products) {
  grid.innerHTML = "";

  if (!products || products.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--ink-soft);">
      New boxes coming soon — check back shortly.
    </p>`;
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    const badgeHtml = p.badge
      ? `<span class="badge">${p.badge}</span>`
      : (!p.inStock ? `<span class="badge sold-out">Sold Out</span>` : "");

    const btnHtml = p.inStock
      ? `<button class="order-btn add-cart-btn" type="button">Add to Cart</button>`
      : `<span class="order-btn disabled">Sold Out</span>`;

    card.innerHTML = `
      <div class="card-tag-hole"></div>
      <div class="card-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x480/F1E7D2/7A5A22?text=Un-Boxd'">
        ${badgeHtml}
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.description || ""}</p>
        <div class="card-foot">
          <span class="price">${p.price} <small>EGP</small></span>
          ${btnHtml}
        </div>
      </div>
    `;

    const addBtn = card.querySelector(".add-cart-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addToCart(p);
        addBtn.textContent = "Added ✓";
        setTimeout(() => { addBtn.textContent = "Add to Cart"; }, 1200);
      });
    }

    grid.appendChild(card);
  });
}

renderProducts(typeof PRODUCTS !== "undefined" ? PRODUCTS : []);

// Category filter tabs
const allProducts = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    const filtered = category === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === category);

    renderProducts(filtered);
  });
});

/* ============================================================
   CART SYSTEM
   ============================================================ */
const CART_KEY = "unboxd_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) { /* storage unavailable, ignore */ }
}

let cart = loadCart();

function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }
  saveCart(cart);
  renderCart();
  openCart();
}

function updateQty(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.name !== name);
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter((i) => i.name !== name);
  saveCart(cart);
  renderCart();
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartSubtotalEl = document.getElementById("cart-subtotal-amount");
const cartCheckoutBtn = document.getElementById("cart-checkout-btn");

function renderCart() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalQty;
  cartCountEl.classList.toggle("empty", totalQty === 0);
  cartSubtotalEl.textContent = `${cartSubtotal()} EGP`;
  cartCheckoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Add a box to get started.</p>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/120x120/F1E7D2/7A5A22?text=Un-Boxd'">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${item.price} EGP</div>
      </div>
      <div class="qty-stepper">
        <button type="button" data-action="dec" data-name="${item.name}">−</button>
        <span>${item.qty}</span>
        <button type="button" data-action="inc" data-name="${item.name}">+</button>
      </div>
      <button class="cart-item-remove" type="button" data-action="remove" data-name="${item.name}" aria-label="Remove item">&times;</button>
    </div>
  `).join("");
}

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const name = btn.dataset.name;
  if (btn.dataset.action === "inc") updateQty(name, 1);
  if (btn.dataset.action === "dec") updateQty(name, -1);
  if (btn.dataset.action === "remove") removeFromCart(name);
});

renderCart();

/* Cart drawer open/close */
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");

function openCart() {
  cartOverlay.classList.add("open");
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartOverlay.classList.remove("open");
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

document.getElementById("cart-open-btn").addEventListener("click", openCart);
document.getElementById("cart-close-btn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* ============================================================
   CHECKOUT MODAL
   ============================================================ */
const checkoutOverlay = document.getElementById("checkout-overlay");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutSummaryEl = document.getElementById("checkout-summary");

function openCheckout() {
  if (cart.length === 0) return;
  renderCheckoutSummary();
  closeCart();
  checkoutOverlay.classList.add("open");
  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
}
function closeCheckout() {
  checkoutOverlay.classList.remove("open");
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
}

function renderCheckoutSummary() {
  const rows = cart.map((item) => `
    <div class="checkout-summary-row">
      <span>${item.name} × ${item.qty}</span>
      <span>${item.price * item.qty} EGP</span>
    </div>
  `).join("");
  checkoutSummaryEl.innerHTML = rows + `
    <div class="checkout-summary-total">
      <span>Total</span>
      <span>${cartSubtotal()} EGP</span>
    </div>
  `;
}

document.getElementById("cart-checkout-btn").addEventListener("click", openCheckout);
document.getElementById("checkout-close-btn").addEventListener("click", closeCheckout);
checkoutOverlay.addEventListener("click", closeCheckout);

/* Build the order message and hand off to WhatsApp on submit */
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) return;

  const name = document.getElementById("cf-name").value.trim();
  const phone = document.getElementById("cf-phone").value.trim();
  const address = document.getElementById("cf-address").value.trim();
  const area = document.getElementById("cf-area").value.trim();
  const notes = document.getElementById("cf-notes").value.trim();

  const itemLines = cart
    .map((item, i) => `${i + 1}. ${item.name} x${item.qty} — ${item.price * item.qty} EGP`)
    .join("\n");

  const message = [
    "🛍️ New Order — Un-Boxd",
    "",
    "Items:",
    itemLines,
    "",
    `Total: ${cartSubtotal()} EGP`,
    "Payment: Cash on Delivery",
    "",
    "Customer Details:",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `Area/City: ${area}`,
    `Notes: ${notes || "None"}`,
    "",
    "Please confirm my order, thank you!"
  ].join("\n");

  window.open(waLink(message), "_blank", "noopener");

  // Clear cart after handing off to WhatsApp
  cart = [];
  saveCart(cart);
  renderCart();
  closeCheckout();
  e.target.reset();
});
