document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  let catName = params.get('cat') || 'Amber Jars';
  if (catName === 'Gift Hampers') catName = 'Gift Hampers';

  const title = document.getElementById('categoryTitleName');
  const pretitle = document.getElementById('categoryPretitle');
  const description = document.getElementById('categoryDescription');
  const grid = document.getElementById('categoryProductGrid');

  if (!title || !grid) return;
  title.textContent = catName;
  if (pretitle) pretitle.textContent = 'The Candleier • Exclusive Collection';
  if (description) description.textContent = `Explore our hand-poured artisan selection of ${catName.toLowerCase()}, formulated with 100% natural organic soy wax and IFRA-certified therapeutic fragrance blends.`;

  const matchedProducts = CANDLE_INVENTORY.filter(item => item.category.toLowerCase() === catName.toLowerCase());

  if (matchedProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-muted);">
        <p style="font-family:var(--font-serif);font-size:1.8rem;color:var(--maroon-light);">No Products Found in this Category</p>
        <p style="font-size:.9rem;margin-top:.5rem;"><a href="full-catalog.html" style="color:var(--maroon-light);text-decoration:underline;">Return to full catalog</a></p>
      </div>`;
    return;
  }

  grid.innerHTML = matchedProducts.map(product => `
    <article class="product-card" style="display:flex;flex-direction:column;justify-content:space-between;">
      <div class="card-media">
        <span class="card-badge">${product.badge}</span>
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
      </div>
      <div class="card-body" style="display:flex;flex-direction:column;flex-grow:1;justify-content:space-between;">
        <div>
          <p class="card-scent-notes">${product.notes.top}</p>
          <h3 class="card-title" style="font-size:1.25rem;margin-bottom:.4rem;">${product.title}</h3>
          <p class="card-specs" style="margin-bottom:.6rem;">⏳ ${product.burn} • 100% Botanical Soy</p>
          <p style="font-size:.85rem;color:var(--text-muted);line-height:1.5;margin-bottom:1.2rem;">${product.desc}</p>
        </div>
        <div class="card-footer" style="border-top:1px solid var(--border-subtle);padding-top:.8rem;display:flex;justify-content:space-between;align-items:center;">
          <div><span class="card-price">₹${product.price.toLocaleString('en-IN')}</span><span class="card-price-orig">₹${product.origPrice.toLocaleString('en-IN')}</span></div>
          <button type="button" class="btn-add-cart" onclick="addToCart(${product.id})">+ Add</button>
        </div>
      </div>
    </article>`).join('');
});
