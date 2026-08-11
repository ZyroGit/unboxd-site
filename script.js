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

    const orderMsg = `Hi! I'd like to order "${p.name}" (${p.price} EGP).`;
    const btnHtml = p.inStock
      ? `<a class="order-btn" href="${waLink(orderMsg)}" target="_blank" rel="noopener">Order on WhatsApp</a>`
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
