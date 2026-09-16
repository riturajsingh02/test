/* =========================================================
   5. CATALOG RENDERING & FILTERING
   ========================================================= */
function renderCatalog(items) {
  if (!dom.productGrid) return;

  if (items.length === 0) {
    dom.productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--maroon-light);">No Fragrances Found</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try searching for notes like "Vanilla", "Oud", "Lavender", or "Rose".</p>
      </div>
    `;
    return;
  }

  dom.productGrid.innerHTML = items.map(product => {
    const isSaved = wishlist.includes(product.id);
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-media" onclick="openPDP(${product.id})">
          <span class="card-badge">${product.badge}</span>
          <button 
            type="button" 
            class="card-wishlist-btn ${isSaved ? 'active' : ''}" 
            aria-label="Save ${product.title} to wishlist" 
            onclick="event.stopPropagation(); toggleWishlist(${product.id});"
          >
            <svg width="16" height="16" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
        </div>

        <div class="card-body">
          <div>
            <p class="card-scent-notes">${product.notes.top}</p>
            <h3 class="card-title" onclick="openPDP(${product.id})">${product.title}</h3>
            <p class="card-specs">⏳ ${product.burn} • 100% Botanical Soy</p>
          </div>

          <div class="card-footer">
            <div>
              <span class="card-price">₹${product.price.toLocaleString('en-IN')}</span>
              <span class="card-price-orig">₹${product.origPrice.toLocaleString('en-IN')}</span>
            </div>
            <button 
              type="button" 
              class="btn-add-cart" 
              onclick="addToCart(${product.id})"
              ${product.stock <= 0 ? 'disabled' : ''}
            >
              ${product.stock <= 0 ? 'Sold Out' : '+ Add'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// function filterProducts() {
//   const query = dom.searchInput ? dom.searchInput.value.toLowerCase().trim() : '';
//   let filtered = CANDLE_INVENTORY;

//   if (activeCategory !== 'all') {
//     filtered = filtered.filter(item => item.category === activeCategory);
//   }

//   if (query) {
//     filtered = filtered.filter(item =>
//       item.title.toLowerCase().includes(query) ||
//       item.desc.toLowerCase().includes(query) ||
//       item.notes.top.toLowerCase().includes(query) ||
//       item.notes.heart.toLowerCase().includes(query) ||
//       item.notes.base.toLowerCase().includes(query)
//     );
//   }

//   renderCatalog(filtered);
// }
/* =========================================================
   5. CATALOG RENDERING, FILTERING & SORTING (UPDATED)
   ========================================================= */
// (Keep your existing renderCatalog function exactly as it is)

function filterProducts() {
  const query = dom.searchInput ? dom.searchInput.value.toLowerCase().trim() : '';
  const sortValue = document.getElementById('sortSelect')?.value || 'recommended';
  
  // Get all checked types
  const typeCheckboxes = Array.from(document.querySelectorAll('.type-filter:checked'));
  const activeTypes = typeCheckboxes.map(cb => cb.value);

  // Get all checked prices
  const priceCheckboxes = Array.from(document.querySelectorAll('.price-filter:checked'));
  const activePrices = priceCheckboxes.map(cb => cb.value);

  let filtered = CANDLE_INVENTORY;

  // 1. Filter by Search Query
  if (query) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.notes.top.toLowerCase().includes(query) ||
      item.notes.heart.toLowerCase().includes(query) ||
      item.notes.base.toLowerCase().includes(query)
    );
  }

  // 2. Filter by Checkbox Types
  if (activeTypes.length > 0) {
    filtered = filtered.filter(item => activeTypes.includes(item.category));
  }

  // 3. Filter by Checkbox Prices
  if (activePrices.length > 0) {
    filtered = filtered.filter(item => {
      if (activePrices.includes('under1000') && item.price < 1000) return true;
      if (activePrices.includes('1000to1500') && item.price >= 1000 && item.price <= 1500) return true;
      if (activePrices.includes('over1500') && item.price > 1500) return true;
      return false;
    });
  }

  // 4. Sort Array
  if (sortValue === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // Revert to original ID order for "recommended"
    filtered.sort((a, b) => a.id - b.id);
  }

  // Update count text
  const countElement = document.getElementById('productCountText');
  if (countElement) {
    countElement.textContent = `${filtered.length} Product${filtered.length !== 1 ? 's' : ''}`;
  }

  renderCatalog(filtered);
}
