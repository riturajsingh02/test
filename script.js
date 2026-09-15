let currentPage = 1;
const ITEMS_PER_PAGE = 64; // 4 items/row * 16 rows = 64 items per view

function renderCatalog(items) {
  if (!dom.productGrid) return;

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  if (currentPage > totalPages) currentPage = 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (items.length === 0) {
    dom.productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--maroon-light);">No Fragrances Found</p>
      </div>
    `;
    removePaginationControls();
    return;
  }

  dom.productGrid.innerHTML = paginatedItems.map(product => {
    const isSaved = wishlist.includes(product.id);
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-media" onclick="openPDP(${product.id})">
          <span class="card-badge">${product.badge}</span>
          <button type="button" class="card-wishlist-btn ${isSaved ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id});">
            <svg width="14" height="14" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
        </div>
        <div class="card-body">
          <div>
            <h3 class="card-title" onclick="openPDP(${product.id})">${product.title}</h3>
          </div>
          <div class="card-footer">
            <div>
              <span class="card-price">₹${product.price.toLocaleString('en-IN')}</span>
            </div>
            <button type="button" class="btn-add-cart" onclick="addToCart(${product.id})">+</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  renderPaginationControls(totalPages, items.length);
}

function renderPaginationControls(totalPages, totalItems) {
  let paginationContainer = document.getElementById('paginationContainer');
  if (!paginationContainer) {
    paginationContainer = document.createElement('div');
    paginationContainer.id = 'paginationContainer';
    paginationContainer.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 1rem; margin: 2rem 0; grid-column: 1 / -1;';
    dom.productGrid.after(paginationContainer);
  }

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  paginationContainer.innerHTML = `
    <button class="btn btn-outline" ${currentPage === 1 ? 'disabled style="opacity:0.5;"' : ''} onclick="changePage(${currentPage - 1})">Previous</button>
    <span style="font-size: 0.9rem; color: var(--text-muted);">Page ${currentPage} of ${totalPages} (${totalItems} items)</span>
    <button class="btn btn-outline" ${currentPage === totalPages ? 'disabled style="opacity:0.5;"' : ''} onclick="changePage(${currentPage + 1})">Next ➔</button>
  `;
}

function removePaginationControls() {
  const container = document.getElementById('paginationContainer');
  if (container) container.remove();
}

function changePage(targetPage) {
  currentPage = targetPage;
  filterProducts();
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
}



const CANDLE_INVENTORY = [
  { id: 1, title: "Golden Glow Votives – Set of 2", category: "Premium Luxury Candles", price: 279, origPrice: 349, burn: "25 Hours", badge: "Bestseller", notes: { top: "Warm Wax", heart: "Clean Cotton", base: "Botanical Soy" }, image: "asset/one.jpg", desc: "Hand-poured premium botanical votives delivering a gentle, soothing ambiance." },
  { id: 2, title: "Ivory Glow Votive", category: "Premium Luxury Candles", price: 149, origPrice: 169, burn: "15 Hours", badge: "Classic", notes: { top: "Pure Soy", heart: "Unscented Glow", base: "Cotton Wick" }, image: "asset/second.jpg", desc: "Simple, elegant ivory votive crafted with 100% natural organic soy wax." },
  { id: 3, title: "Colour Glow Votives", category: "Premium Luxury Candles", price: 179, origPrice: 199, burn: "15 Hours", badge: "Vibrant", notes: { top: "Soft Pastel", heart: "Botanical Soy", base: "Clean Burn" }, image: "asset/third.jpg", desc: "Colorful decorative votives designed to brighten up tabletops and corners." },
  { id: 4, title: "Diamond Glow Jar – White", category: "Premium Luxury Candles", price: 849, origPrice: 999, burn: "45 Hours", badge: "Signature", notes: { top: "White Musk", heart: "Jasmine Petals", base: "Soft Amber" }, image: "asset/four.jpg", desc: "Faceted glass jar reflecting mesmerizing prismatic light patterns." },
  { id: 5, title: "Diamond Glow Jar – Black", category: "Premium Luxury Candles", price: 849, origPrice: 999, burn: "45 Hours", badge: "Bold Luxe", notes: { top: "Dark Woods", heart: "Smoked Vanilla", base: "Oud" }, image: "asset/one.jpg", desc: "Sophisticated black faceted jar adding dramatic modern luxury to interiors." },
  { id: 6, title: "Diamond Glow Jar – Amber", category: "Premium Luxury Candles", price: 849, origPrice: 999, burn: "45 Hours", badge: "Warm Glow", notes: { top: "Golden Amber", heart: "Cinnamon Spice", base: "Cedarwood" }, image: "asset/second.jpg", desc: "Warm amber faceted glass casting a cozy, golden-hued radiance." },
  { id: 7, title: "Mosaic Glow Candle", category: "Premium Luxury Candles", price: 449, origPrice: 499, burn: "30 Hours", badge: "Artisanal", notes: { top: "Sweet Floral", heart: "Rosewater", base: "White Musk" }, image: "asset/third.jpg", desc: "Hand-laid mosaic glass container creating enchanting stained-glass light reflections." },
  { id: 8, title: "Crystal Glow Candle", category: "Premium Luxury Candles", price: 849, origPrice: 999, burn: "45 Hours", badge: "Luxe", notes: { top: "Bergamot", heart: "White Tea", base: "Clean Musk" }, image: "asset/four.jpg", desc: "Crystal-clear glass vessel housing clean-burning botanical soy wax." },
  { id: 9, title: "Triple Glow Bowl Candle", category: "Premium Luxury Candles", price: 799, origPrice: 899, burn: "40 Hours", badge: "Statement", notes: { top: "Lavender", heart: "Clary Sage", base: "Chamomile" }, image: "asset/one.jpg", desc: "Wide-surface bowl candle featuring three cotton wicks for a generous melt pool." },
  { id: 10, title: "Double Glow Jar Candle", category: "Premium Luxury Candles", price: 749, origPrice: 849, burn: "35 Hours", badge: "Bestseller", notes: { top: "Vanilla Bean", heart: "Warm Tonka", base: "Cocoa Butter" }, image: "asset/second.jpg", desc: "Dual-wick jar candle providing balanced fragrance diffusion and illumination." },
  { id: 11, title: "Grand Pillar – White – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "90 Hours", badge: "Grand", notes: { top: "Pure Soy", heart: "Unscented Wax", base: "Cotton Wick" }, image: "asset/third.jpg", desc: "Impressive 12-inch grand pillar candle designed for extended ceremonial burn times." },
  { id: 12, title: "Grand Pillar – Black – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "90 Hours", badge: "Grand", notes: { top: "Charcoal Wax", heart: "Clean Burn", base: "Solid Core" }, image: "asset/four.jpg", desc: "Striking black 12-inch statement pillar offering long-lasting architectural elegance." },
  { id: 13, title: "Grand Pillar – Red – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "90 Hours", badge: "Grand", notes: { top: "Festive Wax", heart: "Clean Burn", base: "Solid Core" }, image: "asset/one.jpg", desc: "Vibrant red 12-inch grand pillar ideal for festive tablescapes and decor." },
  { id: 14, title: "Grand Pillar – Amber – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "90 Hours", badge: "Grand", notes: { top: "Amber Tint", heart: "Clean Burn", base: "Solid Core" }, image: "asset/second.jpg", desc: "Warm amber-toned 12-inch pillar candle bringing rich depth to interior settings." },
  { id: 15, title: "Classic Pillar – White – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "70 Hours", badge: "Classic", notes: { top: "Pure Soy", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/third.jpg", desc: "Traditional 9-inch white pillar candle crafted for timeless interior styling." },
  { id: 16, title: "Classic Pillar – Black – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "70 Hours", badge: "Classic", notes: { top: "Charcoal", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/four.jpg", desc: "Sleek 9-inch black pillar offering clean lines and modern contrast." },
  { id: 17, title: "Classic Pillar – Red – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "70 Hours", badge: "Classic", notes: { top: "Rich Red", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/one.jpg", desc: "Deep red 9-inch pillar candle suited for celebratory and romantic arrangements." },
  { id: 18, title: "Classic Pillar – Amber – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "70 Hours", badge: "Classic", notes: { top: "Amber", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/second.jpg", desc: "Warm amber 9-inch pillar diffusing organic warmth across living spaces." },
  { id: 19, title: "Mini Pillar – White – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "45 Hours", badge: "Mini", notes: { top: "Pure Soy", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/third.jpg", desc: "Compact 6-inch white pillar candle perfect for pairing on decorative trays." },
  { id: 20, title: "Mini Pillar – Black – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "45 Hours", badge: "Mini", notes: { top: "Charcoal", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/four.jpg", desc: "Versatile 6-inch black pillar offering sleek accent lighting." },
  { id: 21, title: "Mini Pillar – Red – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "45 Hours", badge: "Mini", notes: { top: "Rich Red", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/one.jpg", desc: "Charming 6-inch red pillar adding vibrant color pops to mantelpieces." },
  { id: 22, title: "Mini Pillar – Amber – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "45 Hours", badge: "Mini", notes: { top: "Amber", heart: "Clean Burn", base: "Cotton Wick" }, image: "asset/second.jpg", desc: "Cozy 6-inch amber pillar providing gentle, inviting illumination." },
  { id: 23, title: "Grand Square Candle – White – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "85 Hours", badge: "Architectural", notes: { top: "Pure Soy", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/third.jpg", desc: "Contemporary 12-inch square-cut white pillar for modern architectural decor." },
  { id: 24, title: "Grand Square Candle – Black – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "85 Hours", badge: "Architectural", notes: { top: "Charcoal", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/four.jpg", desc: "Striking black square 12-inch pillar with clean geometric silhouettes." },
  { id: 25, title: "Grand Square Candle – Red – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "85 Hours", badge: "Architectural", notes: { top: "Rich Red", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/one.jpg", desc: "Bold red square 12-inch pillar combining striking geometry with rich color." },
  { id: 26, title: "Grand Square Candle – Amber – 12\"", category: "Premium Luxury Candles", price: 1749, origPrice: 1899, burn: "85 Hours", badge: "Architectural", notes: { top: "Amber", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/second.jpg", desc: "Warm amber square 12-inch pillar for sophisticated modern interiors." },
  { id: 27, title: "Classic Square Candle – White – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "65 Hours", badge: "Architectural", notes: { top: "Pure Soy", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/third.jpg", desc: "Balanced 9-inch square white pillar candle for minimalist styling." },
  { id: 28, title: "Classic Square Candle – Black – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "65 Hours", badge: "Architectural", notes: { top: "Charcoal", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/four.jpg", desc: "Sleek 9-inch black square pillar offering modern sculptural appeal." },
  { id: 29, title: "Classic Square Candle – Red – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "65 Hours", badge: "Architectural", notes: { top: "Rich Red", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/one.jpg", desc: "Vibrant 9-inch red square pillar candle for striking visual accents." },
  { id: 30, title: "Classic Square Candle – Amber – 9\"", category: "Premium Luxury Candles", price: 1549, origPrice: 1699, burn: "65 Hours", badge: "Architectural", notes: { top: "Amber", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/second.jpg", desc: "Warm 9-inch amber square pillar casting a soft, geometric glow." },
  { id: 31, title: "Mini Square Candle – White – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "40 Hours", badge: "Architectural", notes: { top: "Pure Soy", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/third.jpg", desc: "Compact 6-inch white square pillar for subtle geometric styling." },
  { id: 32, title: "Mini Square Candle – Black – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "40 Hours", badge: "Architectural", notes: { top: "Charcoal", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/four.jpg", desc: "Chic 6-inch black square pillar adding understated modern charm." },
  { id: 33, title: "Mini Square Candle – Red – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "40 Hours", badge: "Architectural", notes: { top: "Rich Red", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/one.jpg", desc: "Delightful 6-inch red square pillar candle for compact spaces." },
  { id: 34, title: "Mini Square Candle – Amber – 6\"", category: "Premium Luxury Candles", price: 1349, origPrice: 1499, burn: "40 Hours", badge: "Architectural", notes: { top: "Amber", heart: "Geometric Form", base: "Clean Burn" }, image: "asset/second.jpg", desc: "Cozy 6-inch amber square pillar providing warm accent lighting." },
  { id: 35, title: "Ribbed Glow Pillar – Red", category: "Premium Luxury Candles", price: 549, origPrice: 699, burn: "35 Hours", badge: "Textured", notes: { top: "Cranberry", heart: "Warm Spices", base: "Cedarwood" }, image: "asset/third.jpg", desc: "Artisanal ribbed texture candle in deep red casting textured shadows." },
  { id: 36, title: "Ribbed Glow Pillar – White", category: "Premium Luxury Candles", price: 549, origPrice: 699, burn: "35 Hours", badge: "Textured", notes: { top: "White Linen", heart: "Fresh Air", base: "Soft Musk" }, image: "asset/four.jpg", desc: "Elegantly ribbed white pillar candle offering tactile design appeal." },
  { id: 37, title: "Ribbed Glow Pillar – Amber", category: "Premium Luxury Candles", price: 549, origPrice: 699, burn: "35 Hours", badge: "Textured", notes: { top: "Golden Resin", heart: "Warm Amber", base: "Vanilla" }, image: "asset/one.jpg", desc: "Ribbed amber pillar combining tactile fluting with warm glowing tones." },
  { id: 38, title: "Ribbed Glow Pillar – Black", category: "Premium Luxury Candles", price: 549, origPrice: 699, burn: "35 Hours", badge: "Textured", notes: { top: "Dark Smoke", heart: "Oud Wood", base: "Patchouli" }, image: "asset/second.jpg", desc: "Striking black ribbed pillar candle bringing texture and modern moodiness." },
  { id: 39, title: "Mandala Glow Tin – Large", category: "Premium Luxury Candles", price: 399, origPrice: 499, burn: "25 Hours", badge: "Mandala", notes: { top: "Sandalwood", heart: "Jasmine", base: "Warm Spices" }, image: "asset/third.jpg", desc: "Intricate mandala-etched travel tin emitting soothing aromatic notes." },
  { id: 40, title: "Mandala Glow Tin – Small", category: "Premium Luxury Candles", price: 399, origPrice: 499, burn: "20 Hours", badge: "Mandala", notes: { top: "Citrus Zest", heart: "Lotus", base: "White Musk" }, image: "asset/four.jpg", desc: "Compact mandala-engraved tin ideal for portable aromatherapy." },
  { id: 41, title: "Golden Metal Luxe Jar Candle", category: "Metal Collection", price: 849, origPrice: 899, burn: "50 Hours", badge: "Metal Luxe", notes: { top: "Gilded Bergamot", heart: "Saffron", base: "Golden Amber" }, image: "asset/one.jpg", desc: "Hand-poured luxury soy candle housed in a gleaming golden metal vessel." },
  { id: 42, title: "Golden Metal Bowl Candle", category: "Metal Collection", price: 599, origPrice: 699, burn: "30 Hours", badge: "Metal Luxe", notes: { top: "Sweet Orange", heart: "Cinnamon", base: "Vanilla Bean" }, image: "asset/second.jpg", desc: "Shallow golden metal bowl providing an expansive, luminous melt pool." },
  { id: 43, title: "Hazy Metal Luxe Jar Candle", category: "Metal Collection", price: 749, origPrice: 799, burn: "45 Hours", badge: "Metal Luxe", notes: { top: "Smoked Smoke", heart: "Oud Wood", base: "Dark Resin" }, image: "asset/third.jpg", desc: "Brushed hazy metal jar delivering contemporary elegance and rich fragrance." },
  { id: 44, title: "Floral Glow Metal Collection – Set of 3", category: "Metal Collection", price: 849, origPrice: 999, burn: "60 Hours", badge: "Set of 3", notes: { top: "Blooming Florals", heart: "Rose & Jasmine", base: "Soft Musk" }, image: "asset/four.jpg", desc: "Trio of floral-embossed metal candles celebrating botanical elegance." },
  { id: 45, title: "Metal Glow Votive", category: "Metal Collection", price: 499, origPrice: 599, burn: "20 Hours", badge: "Metal Luxe", notes: { top: "Warm Spices", heart: "Vanilla", base: "Amber" }, image: "asset/one.jpg", desc: "Compact metal votive casting shimmering light through polished surfaces." },
  { id: 46, title: "Neroli Reed Diffuser", category: "Diffusers and Aromas", price: 849, origPrice: 999, burn: "90 Days Scent", badge: "Diffuser", notes: { top: "Orange Blossom", heart: "Neroli", base: "Sheer Musk" }, image: "asset/second.jpg", desc: "Continuous uplifting citrus-floral diffusion crafted with IFRA-certified oils." },
  { id: 47, title: "Jasmine Reed Diffuser", category: "Diffusers and Aromas", price: 849, origPrice: 999, burn: "90 Days Scent", badge: "Diffuser", notes: { top: "Fresh Green Leaf", heart: "Night-Blooming Jasmine", base: "Warm Wood" }, image: "asset/third.jpg", desc: "Intoxicating white floral aroma transforming rooms into serene gardens." },
  { id: 48, title: "Lemongrass Reed Diffuser", category: "Diffusers and Aromas", price: 849, origPrice: 999, burn: "90 Days Scent", badge: "Diffuser", notes: { top: "Zesty Lemon", heart: "Fresh Lemongrass", base: "Herbaceous Green" }, image: "asset/four.jpg", desc: "Zesty, invigorating citrus diffusion that purifies and refreshes indoor air." },
  { id: 49, title: "Lavender Reed Diffuser", category: "Diffusers and Aromas", price: 849, origPrice: 999, burn: "90 Days Scent", badge: "Diffuser", notes: { top: "French Lavender", heart: "Clary Sage", base: "Chamomile" }, image: "asset/one.jpg", desc: "Calming botanical diffuser engineered to promote relaxation and restful sleep." },
  { id: 50, title: "Water Lily Reed Diffuser", category: "Diffusers and Aromas", price: 849, origPrice: 999, burn: "90 Days Scent", badge: "Diffuser", notes: { top: "Aquatic Dew", heart: "White Water Lily", base: "Clean Air Accord" }, image: "asset/second.jpg", desc: "Crisp, watery floral notes evoking tranquil morning ponds." },
  { id: 51, title: "Oud Reed Diffuser", category: "Diffusers and Aromas", price: 849, origPrice: 999, burn: "90 Days Scent", badge: "Diffuser", notes: { top: "Smoked Bergamot", heart: "Agarwood", base: "Dark Patchouli" }, image: "asset/third.jpg", desc: "Opulent woody diffuser imparting deep, regal warmth to living areas." },
  { id: 52, title: "Trio Aroma Diffuser Set", category: "Diffusers and Aromas", price: 799, origPrice: 899, burn: "270 Days Scent", badge: "Gift Set", notes: { top: "Assorted Blends", heart: "Lavender, Jasmine, Citrus", base: "Botanical Oils" }, image: "asset/four.jpg", desc: "Curated gift set featuring three signature aromatic reed diffusers." },
  { id: 53, title: "Coco Wood Candle", category: "Wooden Collection", price: 449, origPrice: 599, burn: "30 Hours", badge: "Eco Wood", notes: { top: "Toasted Coconut", heart: "Warm Cedar", base: "Vanilla Amber" }, image: "asset/one.jpg", desc: "Hand-poured soy wax in an eco-friendly natural coconut wood vessel." },
  { id: 54, title: "Grand Boat Candle – Large", category: "Wooden Collection", price: 2149, origPrice: 2299, burn: "100 Hours", badge: "Grand Wood", notes: { top: "Teakwood", heart: "Smoked Mahogany", base: "Rich Resin" }, image: "asset/second.jpg", desc: "Magnificent large wooden boat dough bowl candle with multiple cotton wicks." },
  { id: 55, title: "Grand Boat Candle – Medium", category: "Wooden Collection", price: 1849, origPrice: 1999, burn: "75 Hours", badge: "Grand Wood", notes: { top: "Cedar Leaf", heart: "Washed Oak", base: "Warm Amber" }, image: "asset/third.jpg", desc: "Hand-carved medium wooden boat candle creating a stunning rustic centerpiece." },
  { id: 56, title: "Glow Tea Lights – Set of 50", category: "Premium Luxury Candles", price: 229, origPrice: 299, burn: "4 Hours Each", badge: "Bulk Pack", notes: { top: "Pure Wax", heart: "Unscented", base: "Aluminum Cup" }, image: "asset/four.jpg", desc: "Value pack of 50 clean-burning tea light candles for celebrations and decor." },
  { id: 57, title: "Glow Tea Lights – Set of 20", category: "Premium Luxury Candles", price: 129, origPrice: 149, burn: "4 Hours Each", badge: "Pack of 20", notes: { top: "Pure Wax", heart: "Unscented", base: "Aluminum Cup" }, image: "asset/one.jpg", desc: "Convenient pack of 20 tea lights for daily ambiance and festive accents." },
  { id: 58, title: "Pearl Shell Candle", category: "Premium Luxury Candles", price: 299, origPrice: 349, burn: "20 Hours", badge: "Decorative", notes: { top: "Sea Salt", heart: "Marine Air", base: "White Musk" }, image: "asset/second.jpg", desc: "Exquisitely shaped pearl shell decorative candle with a coastal fragrance." },
  { id: 59, title: "Christmas Glow Trees – Set of 2", category: "Premium Luxury Candles", price: 449, origPrice: 599, burn: "25 Hours", badge: "Festive", notes: { top: "Pine Needle", heart: "Crisp Fir", base: "Cedarwood" }, image: "asset/third.jpg", desc: "Festive pine tree shaped sculptural candles bringing winter forest aromas." },
  { id: 60, title: "Classic Taper Candles – Red – Set of 2", category: "Premium Luxury Candles", price: 189, origPrice: 249, burn: "8 Hours Each", badge: "Taper", notes: { top: "Unscented Wax", heart: "Dripless Burn", base: "Cotton Wick" }, image: "asset/four.jpg", desc: "Elegant red dinner tapers designed for smokeless, dripless burning." },
  { id: 61, title: "Classic Taper Candles – Amber – Set of 2", category: "Premium Luxury Candles", price: 189, origPrice: 249, burn: "8 Hours Each", badge: "Taper", notes: { top: "Unscented Wax", heart: "Dripless Burn", base: "Cotton Wick" }, image: "asset/one.jpg", desc: "Warm amber dinner tapers offering classic dining table elegance." },
  { id: 62, title: "Classic Taper Candles – White – Set of 2", category: "Premium Luxury Candles", price: 189, origPrice: 249, burn: "8 Hours Each", badge: "Taper", notes: { top: "Unscented Wax", heart: "Dripless Burn", base: "Cotton Wick" }, image: "asset/second.jpg", desc: "Timeless white taper candles for formal dining and candleholders." },
  { id: 63, title: "Classic Taper Candles – Black – Set of 2", category: "Premium Luxury Candles", price: 189, origPrice: 249, burn: "8 Hours Each", badge: "Taper", notes: { top: "Unscented Wax", heart: "Dripless Burn", base: "Cotton Wick" }, image: "asset/third.jpg", desc: "Sophisticated black taper candles adding contemporary drama to tablescapes." },
  { id: 64, title: "Gold Dust Taper Candles – Set of 2", category: "Premium Luxury Candles", price: 289, origPrice: 349, burn: "8 Hours Each", badge: "Gilded", notes: { top: "Shimmer Wax", heart: "Gold Flecks", base: "Clean Burn" }, image: "asset/four.jpg", desc: "Gilded taper candles dusted with shimmering gold for celebratory occasions." },
  { id: 65, title: "Scented Wardrobe Wax Tablets", category: "Home essentials", price: 449, origPrice: 499, burn: "60 Days Scent", badge: "Wardrobe", notes: { top: "Lavender & Vanilla", heart: "Fresh Linen", base: "Botanical Wax" }, image: "asset/one.jpg", desc: "Hand-poured botanical wax tablets infused with fine fragrance to scent wardrobes." },
  { id: 66, title: "Seven Chakra Candle Set – Set of 7", category: "Seven Chakra- Positivity collection", price: 699, origPrice: 749, burn: "35 Hours Total", badge: "Positivity", notes: { top: "7 Chakra Blends", heart: "Balance & Harmony", base: "Essential Oils" }, image: "asset/second.jpg", desc: "Set of seven colored candles formulated to balance energy centers and promote mindfulness." }
];

/* =========================================================
   2. APPLICATION STATE
   ========================================================= */
let cart = JSON.parse(localStorage.getItem('thecandleier_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('thecandleier_wishlist')) || [];
let activeCategory = 'all';
let selectedPaymentMethod = 'prepaid';
let activePdpProductId = null;

/* =========================================================
   3. DOM ELEMENT REFERENCES
   ========================================================= */
const dom = {
  productGrid: document.getElementById('productGrid'),
  searchInput: document.getElementById('searchInput'),
  searchTrigger: document.getElementById('searchTrigger'),
  categoryTabs: document.querySelectorAll('.category-tabs .tab-btn'),
  
  // Badges & Counters
  cartCount: document.getElementById('cartCount'),
  cartItemCountDisplay: document.getElementById('cartItemCountDisplay'),
  wishlistCount: document.getElementById('wishlistCount'),
  
  // Drawer & Overlay
  drawerOverlay: document.getElementById('drawerOverlay'),
  cartDrawer: document.getElementById('cartDrawer'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  cartItemsContainer: document.getElementById('cartItemsContainer'),
  cartSubtotalText: document.getElementById('cartSubtotalText'),
  meterBarFill: document.getElementById('meterBarFill'),
  shippingMeterText: document.getElementById('shippingMeterText'),
  proceedCheckoutBtn: document.getElementById('proceedCheckoutBtn'),

  // Mobile Hamburger Drawer
  hamburgerBtn: document.getElementById('hamburgerBtn'),
  closeMobileNavBtn: document.getElementById('closeMobileNavBtn'),
  mobileDrawer: document.getElementById('mobileDrawer'),
  
  // PDP Modal
  pdpModal: document.getElementById('pdpModal'),
  closePdpBtn: document.getElementById('closePdpBtn'),
  pdpImage: document.getElementById('pdpImage'),
  pdpCategory: document.getElementById('pdpCategory'),
  pdpTitle: document.getElementById('pdpTitle'),
  pdpPrice: document.getElementById('pdpPrice'),
  pdpOrigPrice: document.getElementById('pdpOrigPrice'),
  pdpDescription: document.getElementById('pdpDescription'),
  pdpTopNotes: document.getElementById('pdpTopNotes'),
  pdpHeartNotes: document.getElementById('pdpHeartNotes'),
  pdpBaseNotes: document.getElementById('pdpBaseNotes'),
  pdpBurnTime: document.getElementById('pdpBurnTime'),
  pdpAddToCartBtn: document.getElementById('pdpAddToCartBtn'),
  pincodeInput: document.getElementById('pincodeInput'),
  checkPincodeBtn: document.getElementById('checkPincodeBtn'),
  pincodeMsg: document.getElementById('pincodeMsg'),
  
  // Checkout Modal
  checkoutModal: document.getElementById('checkoutModal'),
  closeCheckoutBtn: document.getElementById('closeCheckoutBtn'),
  checkoutForm: document.getElementById('checkoutForm'),
  checkoutAmountTotal: document.getElementById('checkoutAmountTotal'),
  labelPrepaid: document.getElementById('labelPrepaid'),
  labelCod: document.getElementById('labelCod'),
  
  // Policy Modal
  policyModal: document.getElementById('policyModal'),
  closePolicyBtn: document.getElementById('closePolicyBtn'),
  policyModalTitle: document.getElementById('policyModalTitle'),
  policyModalBody: document.getElementById('policyModalBody'),
  
  // Feedback
  toastNotice: document.getElementById('toastNotice')
};

/* =========================================================
   4. TOAST NOTIFICATION UTILITY
   ========================================================= */
function showToast(message) {
  if (!dom.toastNotice) return;
  dom.toastNotice.textContent = message;
  dom.toastNotice.classList.add('show');
  setTimeout(() => {
    dom.toastNotice.classList.remove('show');
  }, 2800);
}

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
            >
              + Add
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
/* =========================================================
   5. CATALOG RENDERING, FILTERING & SORTING (UPDATED)
   ========================================================= */
function filterProducts() {
  const query = dom.searchInput ? dom.searchInput.value.toLowerCase().trim() : '';
  const sortValue = document.getElementById('sortSelect')?.value || 'recommended';
  
  const activeTypes = Array.from(document.querySelectorAll('.type-filter:checked')).map(cb => cb.value);
  const activePrices = Array.from(document.querySelectorAll('.price-filter:checked')).map(cb => cb.value);
  const activeScents = Array.from(document.querySelectorAll('.scent-filter:checked')).map(cb => cb.value);

  let filtered = CANDLE_INVENTORY;

  if (query) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.notes.top.toLowerCase().includes(query) ||
      item.notes.heart.toLowerCase().includes(query) ||
      item.notes.base.toLowerCase().includes(query)
    );
  }

  if (activeTypes.length > 0) {
    filtered = filtered.filter(item => activeTypes.includes(item.category));
  }

  if (activePrices.length > 0) {
    filtered = filtered.filter(item => {
      if (activePrices.includes('under1000') && item.price < 1000) return true;
      if (activePrices.includes('1000to1500') && item.price >= 1000 && item.price <= 1500) return true;
      if (activePrices.includes('over1500') && item.price > 1500) return true;
      return false;
    });
  }

  if (activeScents.length > 0) {
    filtered = filtered.filter(item => {
      const allNotes = (item.notes.top + " " + item.notes.heart + " " + item.notes.base).toLowerCase();
      return activeScents.some(scent => allNotes.includes(scent));
    });
  }

  if (sortValue === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortValue === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => a.id - b.id);

  const countElement = document.getElementById('productCountText');
  if (countElement) countElement.textContent = `${filtered.length} Product${filtered.length !== 1 ? 's' : ''}`;

  renderCatalog(filtered);
}

/* =========================================================
   6. CART OPERATIONS & FREE SHIPPING METER
   ========================================================= */
// (Keep your existing updateCartUI function exactly as it is below this)

/* =========================================================
   6. CART OPERATIONS & FREE SHIPPING METER
   ========================================================= */
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (dom.cartCount) dom.cartCount.textContent = totalCount;
  if (dom.cartItemCountDisplay) dom.cartItemCountDisplay.textContent = totalCount;
  if (dom.cartSubtotalText) dom.cartSubtotalText.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  // Free shipping progress logic (Threshold: ₹999)
  const freeThreshold = 999;
  if (dom.meterBarFill && dom.shippingMeterText) {
    if (subtotal >= freeThreshold) {
      dom.meterBarFill.style.width = '100%';
      dom.shippingMeterText.textContent = '🎉 You unlocked FREE Express Delivery!';
    } else {
      const percentage = Math.min((subtotal / freeThreshold) * 100, 100);
      dom.meterBarFill.style.width = `${percentage}%`;
      const difference = freeThreshold - subtotal;
      dom.shippingMeterText.textContent = `Add ₹${difference.toLocaleString('en-IN')} more for FREE Express Delivery`;
    }
  }

  if (!dom.cartItemsContainer) return;

  if (cart.length === 0) {
    dom.cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--maroon-light); margin-bottom: 0.5rem;">Your Bag is Empty</p>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Discover hand-poured botanical candles to light up your space.</p>
        <button type="button" class="btn btn-gold" onclick="toggleCartDrawer(false)">Explore Fragrances</button>
      </div>
    `;
    return;
  }

  dom.cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-info">
        <h5>${item.title}</h5>
        <p>₹${(item.price * item.qty).toLocaleString('en-IN')}</p>
        <div class="qty-controls">
          <button type="button" onclick="modifyQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button type="button" onclick="modifyQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button 
        type="button" 
        style="color: var(--maroon-light); font-size: 1.1rem; padding: 4px;" 
        aria-label="Remove item" 
        onclick="modifyQty(${item.id}, -9999)"
      >
        ✕
      </button>
    </div>
  `).join('');
}

function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = CANDLE_INVENTORY.find(item => item.id === productId);
    if (product) cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('thecandleier_cart', JSON.stringify(cart));
  updateCartUI();
  toggleCartDrawer(true);
  showToast("Added to shopping bag!");
}

function modifyQty(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  localStorage.setItem('thecandleier_cart', JSON.stringify(cart));
  updateCartUI();
}

function toggleCartDrawer(isOpen) {
  if (!dom.cartDrawer || !dom.drawerOverlay) return;
  dom.cartDrawer.classList.toggle('active', isOpen);
  dom.drawerOverlay.classList.toggle('active', isOpen);
}

/* =========================================================
   7. WISHLIST OPERATIONS
   ========================================================= */
function updateWishlistUI() {
  if (dom.wishlistCount) {
    dom.wishlistCount.textContent = wishlist.length;
  }
}

function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(productId);
    showToast("Saved to wishlist ♡");
  }

  localStorage.setItem('thecandleier_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  filterProducts();
}

function showSavedWishlist() {
  if (wishlist.length === 0) {
    showToast("Your wishlist is empty. Tap ♡ on any candle to save.");
    return;
  }
  const savedItems = CANDLE_INVENTORY.filter(p => wishlist.includes(p.id));
  renderCatalog(savedItems);
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  showToast(`Showing ${wishlist.length} saved candle${wishlist.length > 1 ? 's' : ''}`);
}

/* =========================================================
   8. PRODUCT QUICK VIEW MODAL (PDP) & PINCODE VERIFIER
   ========================================================= */
function openPDP(productId) {
  const product = CANDLE_INVENTORY.find(item => item.id === productId);
  if (!product || !dom.pdpModal) return;

  activePdpProductId = product.id;
  dom.pdpImage.src = product.image;
  dom.pdpImage.alt = product.title;
  dom.pdpCategory.textContent = product.category;
  dom.pdpTitle.textContent = product.title;
  dom.pdpPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  dom.pdpOrigPrice.textContent = `₹${product.origPrice.toLocaleString('en-IN')}`;
  dom.pdpDescription.textContent = product.desc;

  dom.pdpTopNotes.textContent = product.notes.top;
  dom.pdpHeartNotes.textContent = product.notes.heart;
  dom.pdpBaseNotes.textContent = product.notes.base;
  dom.pdpBurnTime.textContent = product.burn;

  if (dom.pincodeInput) dom.pincodeInput.value = '';
  if (dom.pincodeMsg) dom.pincodeMsg.textContent = '';

  dom.pdpModal.classList.add('active');
  dom.drawerOverlay?.classList.add('active');
}

function closePDP() {
  if (!dom.pdpModal) return;
  dom.pdpModal.classList.remove('active');
  dom.drawerOverlay?.classList.remove('active');
  activePdpProductId = null;
}

function verifyPincode() {
  const pincode = dom.pincodeInput?.value.trim();
  if (!dom.pincodeMsg) return;

  if (pincode && pincode.length === 6 && !isNaN(pincode)) {
    dom.pincodeMsg.style.color = '#2E7D32';
    dom.pincodeMsg.textContent = `✓ Pincode ${pincode} is serviceable! Delivery within 2–4 days. Cash on Delivery (COD) available.`;
  } else {
    dom.pincodeMsg.style.color = '#C62828';
    dom.pincodeMsg.textContent = 'Please enter a valid 6-digit Indian pincode.';
  }
}

/* =========================================================
   9. CHECKOUT SYSTEM (PREPAID & COD)
   ========================================================= */
function openCheckout() {
  if (cart.length === 0) {
    showToast("Please add candles to your bag first.");
    return;
  }
  toggleCartDrawer(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (dom.checkoutAmountTotal) {
    dom.checkoutAmountTotal.textContent = subtotal.toLocaleString('en-IN');
  }

  dom.checkoutModal?.classList.add('active');
  dom.drawerOverlay?.classList.add('active');
}

function closeCheckout() {
  dom.checkoutModal?.classList.remove('active');
  dom.drawerOverlay?.classList.remove('active');
}

function setPaymentSelection(method) {
  selectedPaymentMethod = method;
  if (dom.labelPrepaid && dom.labelCod) {
    dom.labelPrepaid.classList.toggle('selected', method === 'prepaid');
    dom.labelCod.classList.toggle('selected', method === 'cod');
  }
}

function processOrder(e) {
  e.preventDefault();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderNumber = `CNDL-${Math.floor(100000 + Math.random() * 900000)}`;

  if (selectedPaymentMethod === 'prepaid') {
    alert(
      `Connecting to Razorpay Secure Gateway...\n\n` +
      `Amount: ₹${subtotal.toLocaleString('en-IN')}\n` +
      `Supported: UPI (Google Pay, PhonePe), Cards & NetBanking\n\n` +
      `Payment Simulation Success! Order ${orderNumber} is confirmed.`
    );
  } else {
    alert(
      `Order ${orderNumber} Placed Successfully with Cash on Delivery (COD)!\n\n` +
      `Payable amount: ₹${subtotal.toLocaleString('en-IN')}.\n` +
      `Please keep exact cash or UPI ready upon courier arrival.`
    );
  }

  // Clear cart on successful order
  cart = [];
  localStorage.setItem('thecandleier_cart', JSON.stringify(cart));
  updateCartUI();
  closeCheckout();
  showToast("Order Confirmed! SMS update initiated.");
}

/* =========================================================
   10. POLICY CONTENT VIEWER MODAL
   ========================================================= */
// const POLICIES = {
//   shipping: {
//     title: "Shipping & Cash On Delivery Policy",
//     content: `
//       <p><strong>Courier Partners:</strong> We ship across India via Bluedart, and Express Air couriers.</p>
//       <p style="margin-top: 0.8rem;"><strong>Delivery Timelines:</strong></p>
//       <ul style="padding-left: 1.2rem; margin-top: 0.4rem;">
//         <li>Metro Cities (Delhi NCR, Mumbai, Bengaluru, etc.): 2–3 business days.</li>
//         <li>Rest of India: 4–6 business days.</li>
//       </ul>
//       <p style="margin-top: 0.8rem;"><strong>Shipping Charges:</strong> Free Express Shipping on all prepaid orders exceeding ₹999. Orders below ₹999 incur a flat ₹90 shipping charge.</p>
//       <p style="margin-top: 0.8rem;"><strong>Cash on Delivery (COD):</strong> Available on orders up to ₹999 across all verified postal codes.</p>
//     `
//   },
//   returns: {
//     title: "Returns & Refund Policy",
//     content: `
//       <p>Due to the artisanal, hand-poured botanical nature of our candles, items once lit cannot be returned.</p>
//       <p style="margin-top: 0.8rem;"><strong>Transit Damage Guarantee:</strong> In the rare event your glass jar arrives broken or damaged, please send an unboxing photo or video to our WhatsApp or email within 48 hours of delivery. We will courier an immediate free replacement.</p>
//       <p style="margin-top: 0.8rem;"><strong>Cancellation:</strong> Orders can be cancelled within 4 hours of placement before warehouse dispatch.</p>
//     `
//   },
//   privacy: {
//     title: "Privacy Policy",
//     content: `
//       <p>Your privacy is strictly guarded at The Candleier. We utilize 256-bit SSL encryption to protect checkout information.</p>
//       <p style="margin-top: 0.8rem;">We never sell, rent, or distribute personal phone numbers, physical addresses, or financial records to third-party data aggregators.</p>
//     `
//   },
//   terms: {
//     title: "Terms of Service",
//     content: `
//       <p>All brand marks, script titles, visual photography, and proprietary fragrance blends belong strictly to The Candleier.</p>
//       <p style="margin-top: 0.8rem;">Burn times are approximate based on optimal indoor conditions with cotton wicks regularly trimmed to 1/4 inch.</p>
//     `
//   }
// };
const POLICIES = {
  shipping: {
    title: "Shipping & Cash On Delivery (COD) Policy",
    content: `
      <p><strong>Order Processing:</strong> All orders placed on our website are dispatched through reputed national express courier partners within 24 to 48 business hours.</p>
      <p style="margin-top: 0.8rem;"><strong>Delivery Timelines:</strong></p>
      <ul style="padding-left: 1.2rem; margin-top: 0.4rem; line-height: 1.6;">
        <li><strong>Metropolitan Cities:</strong> Typically delivered within 3 to 5 business days post-dispatch.</li>
        <li><strong>Rest of India / Non-Metro Regions:</strong> Typically delivered within 5 to 7 business days.</li>
      </ul>
      <p style="margin-top: 0.8rem;"><strong>Shipping Charges:</strong> Free standard shipping is provided on prepaid orders meeting the current cart promotion threshold. Standard flat shipping fees apply on all sub-threshold orders and are visible at checkout.</p>
      <p style="margin-top: 0.8rem;"><strong>Cash on Delivery (COD):</strong> COD is available across serviceable pin codes for verified orders up to ₹999. Additional COD convenience fees may apply. Courier partners cannot hand over parcels for inspection prior to collecting full COD payment.</p>
      <p style="margin-top: 0.8rem;"><strong>Tracking:</strong> Real-time shipment tracking IDs are shared via SMS and registered email once the package is accepted by the courier facility.</p>
    `
  },
  returns: {
    title: "Returns, Exchange & Refund Policy",
    content: `
      <p><strong>Eligibility Window:</strong> Items can be requested for return or replacement within 48 hours of delivery in the event of transit breakage, physical damage, manufacturing defects, or wrong item delivery.</p>
      <p style="margin-top: 0.8rem;"><strong>Conditions for Return:</strong></p>
      <ul style="padding-left: 1.2rem; margin-top: 0.4rem; line-height: 1.6;">
        <li>The product must remain unused, unlit, unwashed, and in original condition.</li>
        <li>Original brand packaging, tags, barcode labels, and internal protective packing must be completely intact.</li>
        <li>An unboxing photograph or short video clearly highlighting the defect/breakage along with the courier invoice label is required for verification.</li>
      </ul>
      <p style="margin-top: 0.8rem;"><strong>Non-Returnable Items:</strong> Lighted candles, depleted wax items, final sale clearance items, and gift hampers with broken seals cannot be returned due to hygiene and safety standards.</p>
      <p style="margin-top: 0.8rem;"><strong>Refunds:</strong> Once the returned merchandise is received and verified at our fulfillment center, refunds will be initiated within 5 to 7 business days back to the original payment source (prepaid orders) or credited via bank transfer/store credit (COD orders).</p>
    `
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      <p>We respect your right to personal data protection. This Privacy Policy governs the manner in which customer personal information is collected, maintained, and processed.</p>
      <p style="margin-top: 0.8rem;"><strong>Data Collection:</strong> We collect contact information (name, shipping address, email address, phone number) when you register, browse, or place an order on our platform.</p>
      <p style="margin-top: 0.8rem;"><strong>Payment Security:</strong> Payment card numbers, UPI credentials, and net banking information are processed directly by RBI-licensed, PCI-DSS compliant third-party payment gateways through encrypted SSL channels. We do not store financial card numbers or CVVs on our servers.</p>
      <p style="margin-top: 0.8rem;"><strong>Information Sharing:</strong> Your personal contact details are shared strictly with necessary operational partners (courier handlers, SMS notification gateways) solely to complete fulfillment. We never rent, trade, or sell your personal data to external marketing vendors.</p>
    `
  },
  terms: {
    title: "Terms of Use & Service",
    content: `
      <p>Welcome to our online store. By browsing, accessing, or placing an order on this website, you agree to abide by and be bound by these Terms of Use.</p>
      <p style="margin-top: 0.8rem;"><strong>Intellectual Property:</strong> All text, visuals, brand logos, product descriptions, photography, sound compositions, graphic designs, and digital assets are proprietary property and protected under applicable intellectual property and copyright laws.</p>
      <p style="margin-top: 0.8rem;"><strong>Product Descriptions & Pricing:</strong> We make every attempt to render colors, dimensions, and materials accurately. However, slight variations in color tone or hand-poured wax finishes may occur due to screen calibration and artisanal batch production. We reserve the right to correct typographical errors or price inaccuracies and cancel affected orders prior to fulfillment.</p>
      <p style="margin-top: 0.8rem;"><strong>Order Acceptance & Cancellation:</strong> Receipt of an order confirmation does not signify our final acceptance of your order. We reserve the unilateral right to accept, decline, or limit quantity on any order without prior liability in cases of suspected fraud or inventory unavailability.</p>
      <p style="margin-top: 0.8rem;"><strong>Governing Law:</strong> These terms shall be construed and governed in accordance with the laws of India, subject to the exclusive jurisdiction of the competent courts.</p>
    `
  }
};

function displayPolicy(policyKey) {
  const policy = POLICIES[policyKey];
  if (!policy || !dom.policyModal) return;

  dom.policyModalTitle.textContent = policy.title;
  dom.policyModalBody.innerHTML = policy.content;
  dom.policyModal.classList.add('active');
  dom.drawerOverlay?.classList.add('active');
}

function closePolicyModal() {
  dom.policyModal?.classList.remove('active');
  dom.drawerOverlay?.classList.remove('active');
}

/* =========================================================
   11. EVENT LISTENERS & INITIALIZATION
   ========================================================= */
function setupEventListeners() {
  // =========================================================
// STICKY NAVBAR SCROLL OBSERVER
// =========================================================
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const announcementBar = document.querySelector('.announcement-bar');
  
  if (!header) return;

  // Get height of announcement bar to know when to trigger stickiness
  const triggerHeight = announcementBar ? announcementBar.offsetHeight : 40;

  if (window.scrollY > triggerHeight) {
    header.classList.add('is-sticky');
  } else {
    header.classList.remove('is-sticky');
  }
});
    // --- NEW: Professional Dropdown Logic ---
  document.querySelectorAll('.filter-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.parentElement;
      
      // Close other open dropdowns
      document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        if(dropdown !== parent) dropdown.classList.remove('active');
      });
      
      parent.classList.toggle('active');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  });

  // Listen to new scent checkboxes
  document.querySelectorAll('.scent-filter').forEach(cb => {
    cb.addEventListener('change', filterProducts);
  });
// --- NEW: PLP Sidebar & Sorting Listeners ---
  
  // Listen to Sidebar Checkboxes
  document.querySelectorAll('.type-filter, .price-filter').forEach(cb => {
    cb.addEventListener('change', filterProducts);
  });

  // Listen to Sort Dropdown
  document.getElementById('sortSelect')?.addEventListener('change', filterProducts);

  // Listen to Visual Circular Categories
  document.querySelectorAll('.visual-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCat = btn.getAttribute('data-cat');
      
      // Uncheck all type checkboxes first
      document.querySelectorAll('.type-filter').forEach(cb => cb.checked = false);
      
      // Check the one that matches the circle clicked
      const targetCheckbox = document.querySelector(`.type-filter[value="${targetCat}"]`);
      if (targetCheckbox) {
        targetCheckbox.checked = true;
      }
      
      // Scroll smoothly to the product grid
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Trigger the filter
      filterProducts();
    });
  });

  // Filter accordion toggle (+ / - logic)
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const options = toggle.nextElementSibling;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.querySelector('span').textContent = isExpanded ? '+' : '−';
      options.style.display = isExpanded ? 'none' : 'flex';
    });
  });

  // Mobile Hamburger Drawer Toggle
  function toggleMobileDrawer(isOpen) {
    if (dom.mobileDrawer) dom.mobileDrawer.classList.toggle('active', isOpen);
    if (dom.drawerOverlay) dom.drawerOverlay.classList.toggle('active', isOpen);
  }

  dom.hamburgerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileDrawer(true);
  });

  dom.closeMobileNavBtn?.addEventListener('click', () => {
    toggleMobileDrawer(false);
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileDrawer(false);
    });
  });

  // Category tab filtering
  dom.categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dom.categoryTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.dataset.category || 'all';
      filterProducts();
    });
  });

  // Search input and trigger
  dom.searchInput?.addEventListener('input', filterProducts);
  dom.searchTrigger?.addEventListener('click', () => {
    dom.searchInput?.focus();
    dom.searchInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Cart Drawer open/close
  document.getElementById('cartTrigger')?.addEventListener('click', () => toggleCartDrawer(true));
  dom.closeCartBtn?.addEventListener('click', () => toggleCartDrawer(false));
  
  // Overlay click closes all open drawers and modals
  dom.drawerOverlay?.addEventListener('click', () => {
    toggleCartDrawer(false);
    toggleMobileDrawer(false);
    closePDP();
    closeCheckout();
    closePolicyModal();
  });

  // Wishlist triggers
  document.getElementById('wishlistTrigger')?.addEventListener('click', showSavedWishlist);

  // PDP Modal handlers
  dom.closePdpBtn?.addEventListener('click', closePDP);
  dom.pdpAddToCartBtn?.addEventListener('click', () => {
    if (activePdpProductId) {
      addToCart(activePdpProductId);
      closePDP();
    }
  });
  dom.checkPincodeBtn?.addEventListener('click', verifyPincode);
  dom.pincodeInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') verifyPincode();
  });

  // Checkout flow handlers
  dom.proceedCheckoutBtn?.addEventListener('click', openCheckout);
  dom.closeCheckoutBtn?.addEventListener('click', closeCheckout);
  dom.checkoutForm?.addEventListener('submit', processOrder);

  // Payment radio card changes
  document.querySelectorAll('input[name="paymentType"]').forEach(radio => {
    radio.addEventListener('change', e => {
      setPaymentSelection(e.target.value);
    });
  });

  // Policy triggers
  document.querySelectorAll('.link-btn[data-policy]').forEach(btn => {
    btn.addEventListener('click', () => {
      displayPolicy(btn.dataset.policy);
    });
  });
  dom.closePolicyBtn?.addEventListener('click', closePolicyModal);

  // FAQ Accordion toggles
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // "Coming Soon" notification buttons
  document.getElementById('notifyDecorBtn')?.addEventListener('click', () => {
    alert("Thank you! You will receive early concierge access when the Home Décor line is unveiled.");
  });
  document.getElementById('notifyJournalBtn')?.addEventListener('click', () => {
    alert("Our editorial series on olfactory craft and candle care releases next month.");
  });

  // Mobile App Bottom Navigation triggers
  document.getElementById('mobHomeBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('mobShopBtn')?.addEventListener('click', () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('mobWishlistBtn')?.addEventListener('click', showSavedWishlist);
  document.getElementById('mobBagBtn')?.addEventListener('click', () => toggleCartDrawer(true));

  // Escape key closes open modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      toggleCartDrawer(false);
      toggleMobileDrawer(false);
      closePDP();
      closeCheckout();
      closePolicyModal();
    }
  });
}

// Function to render the new minimalist cards on the homepage
function renderNewArrivals() {
  const arrivalsGrid = document.getElementById('newArrivalsGrid');
  if (!arrivalsGrid) return;

  // Grab 4 specific products to feature as New Arrivals (e.g., IDs 1, 4, 10, 46)
  const featuredProducts = CANDLE_INVENTORY.filter(p => [1, 4, 10, 46].includes(p.id));

  arrivalsGrid.innerHTML = featuredProducts.map(product => {
    const isSaved = wishlist.includes(product.id);
    // Heart icon logic (empty vs filled)
    const heartIcon = isSaved ? '♥' : '♡'; 
    
    return `
      <article class="minimal-card" data-id="${product.id}">
        <div class="minimal-media" onclick="openPDP(${product.id})">
          <span class="minimal-badge">${product.badge}</span>
          <button type="button" class="minimal-wishlist ${isSaved ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id});">${heartIcon}</button>
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="minimal-info">
          <div class="minimal-title-row">
            <h3 onclick="openPDP(${product.id})">${product.title}</h3>
            <span class="minimal-price">₹${product.price.toLocaleString('en-IN')}</span>
          </div>
          <p class="minimal-sub">${product.category} · ${product.notes.top}</p>
          <p class="minimal-sub">${product.burn} · Botanical soy wax</p>
        </div>
      </article>
    `;
  }).join('');
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(CANDLE_INVENTORY);
  renderNewArrivals(); // <-- Call the new function here
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
});