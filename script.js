const CANDLE_INVENTORY = [
  // 1-6: Amber Jar Series
  {
    id: 1,
    title: "Madagascar Cashmere Vanilla",
    category: "Amber Jars",
    price: 1199,
    origPrice: 1499,
    burn: "55 Hours",
    badge: "Bestseller",
    notes: { top: "Bourbon Vanilla, Raw Cocoa", heart: "Warm Tonka Bean", base: "Golden Amber, White Cedar" },
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    desc: "A rich, enveloping gourmand blend hand-poured with real Madagascar vanilla bean extracts and soothing smoked amber."
  },
  {
    id: 2,
    title: "Midnight Imperial Oud",
    category: "Amber Jars",
    price: 1399,
    origPrice: 1699,
    burn: "55 Hours",
    badge: "Royal Luxe",
    notes: { top: "Italian Bergamot, Smoke", heart: "Aged Assam Agarwood", base: "Dark Patchouli, Sandalwood" },
    image: "asset/four.jpg",
    desc: "Intense, regal, and deep. Formulated with rare aged oudh oil and smoked incense for an opulent evening ambiance."
  },
  {
    id: 3,
    title: "Provençal French Lavender",
    category: "Amber Jars",
    price: 999,
    origPrice: 1299,
    burn: "50 Hours",
    badge: "Calming",
    notes: { top: "French Lavender Buds", heart: "Wild Clary Sage", base: "Roman Chamomile, Cedar" },
    image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=700&q=80",
    desc: "High-altitude French lavender formulated to soothe sensory tension, calm breathing, and prepare the mind for sleep."
  },
  {
    id: 4,
    title: "Wild Neroli & Blood Orange",
    category: "Amber Jars",
    price: 1099,
    origPrice: 1399,
    burn: "50 Hours",
    badge: "Citrus",
    notes: { top: "Blood Orange, Pomelo", heart: "Orange Blossom, Neroli", base: "Crushed Petitgrain, Sheer Musk" },
    image: "asset/one.jpg",
    desc: "A vibrant sunshine bouquet designed to clear stale air, invigorate focus, and lift the mood of your living space."
  },
  {
    id: 5,
    title: "Vintage Tobacco & Smoked Oak",
    category: "Amber Jars",
    price: 1299,
    origPrice: 1599,
    burn: "55 Hours",
    badge: "Woody",
    notes: { top: "Highland Malt Accord", heart: "Cured Tobacco Leaves", base: "Smoked Oakwood, Benzoin" },
    image: "asset/second.jpg",
    desc: "Evoking private libraries, fireside leather armchairs, and antique book bindings with warm resinous notes."
  },
  {
    id: 6,
    title: "Eucalyptus & Spearmint Vapor",
    category: "Amber Jars",
    price: 999,
    origPrice: 1199,
    burn: "50 Hours",
    badge: "Spa Revival",
    notes: { top: "Crushed Spearmint", heart: "Blue Gum Eucalyptus", base: "Herbal Thyme, Fir Needle" },
    image: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=700&q=80",
    desc: "Therapeutic cooling vapors that clear airways, purify interior air, and transform bathrooms into a luxury steam spa."
  },

  // 7-12: Frosted Luxe Series
  {
    id: 7,
    title: "Velvet Rose & Smoked Peony",
    category: "Frosted Luxe",
    price: 1499,
    origPrice: 1799,
    burn: "60 Hours",
    badge: "Signature",
    notes: { top: "Damask Rose Water", heart: "Blush Peony, Clove", base: "Ambergris, Powdered Musk" },
    image: "asset/third.jpg",
    desc: "Poured in fluted frosted glass, combining lush Bulgarian rose absolutes with delicate dewy peonies."
  },
  {
    id: 8,
    title: "Roasted Arabica & Hazelnut",
    category: "Frosted Luxe",
    price: 1299,
    origPrice: 1599,
    burn: "55 Hours",
    badge: "Gourmand",
    notes: { top: "Fresh Dark Roast Espresso", heart: "Toasted Hazelnut Cream", base: "Caramelized Raw Sugar" },
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    desc: "Infuses the air with the comforting fragrance of a slow morning at a Parisian espresso counter."
  },
  {
    id: 9,
    title: "White Tea & Himalayan Thyme",
    category: "Frosted Luxe",
    price: 1399,
    origPrice: 1699,
    burn: "55 Hours",
    badge: "Hotel Luxe",
    notes: { top: "Silver Needle White Tea", heart: "Alpine Thyme, Jasmine", base: "Dry Birch, Clean Musk" },
    image: "asset/four.jpg",
    desc: "Crisp, minimalist, and serene. The understated signature scent favored by premier boutique hospitality spaces."
  },
  {
    id: 10,
    title: "Kashmiri Saffron & Cardamom",
    category: "Frosted Luxe",
    price: 1499,
    origPrice: 1899,
    burn: "60 Hours",
    badge: "Heritage",
    notes: { top: "Pure Saffron Threads", heart: "Green Cardamom Seed", base: "Condensed Milk, Pistachio" },
    image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=700&q=80",
    desc: "A rich celebration of royal Indian culinary heritage with warming spices and golden pistachios."
  },
  {
    id: 11,
    title: "Charred Cedar & Embers",
    category: "Frosted Luxe",
    price: 1349,
    origPrice: 1649,
    burn: "55 Hours",
    badge: "Wood Wick",
    notes: { top: "Crisp Pine Needle", heart: "Charred Birchwood", base: "Virginia Cedar, Vetiver" },
    image: "asset/one.jpg",
    desc: "Features a natural crackling wood wick that emits the relaxing auditory snap of a burning hearth."
  },
  {
    id: 12,
    title: "Kyoto Cherry Blossom (Sakura)",
    category: "Frosted Luxe",
    price: 1299,
    origPrice: 1549,
    burn: "50 Hours",
    badge: "Floral",
    notes: { top: "Sakura Petals", heart: "Fuji Crisp Apple", base: "Blonde Woods, Sheer Violet" },
    image: "asset/second.jpg",
    desc: "Soft spring breeze captured through delicate Japanese floral petals and sweet orchard fruit notes."
  },

  // 13-18: Travel Tins
  {
    id: 13,
    title: "Cochin Lemongrass & Ginger Tin",
    category: "Travel Tins",
    price: 499,
    origPrice: 699,
    burn: "25 Hours",
    badge: "Travel Tin",
    notes: { top: "Spiced Ginger", heart: "Fresh Cut Lemongrass", base: "Coriander Leaf" },
    image: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=700&q=80",
    desc: "Gold aluminum tin with a threaded lid. Refresh hotel suites or desktop workspaces on the go."
  },
  {
    id: 14,
    title: "Wild Fig Leaf & Coconut Tin",
    category: "Travel Tins",
    price: 549,
    origPrice: 699,
    burn: "25 Hours",
    badge: "Tropical",
    notes: { top: "Green Fig Leaf", heart: "Creamy Coconut Nectar", base: "Warm Ambergris" },
    image: "asset/third.jpg",
    desc: "Transportive island breezes infused with luscious milky fig sap and tender coconut water."
  },
  {
    id: 15,
    title: "Ceylon Cinnamon & Clove Tin",
    category: "Travel Tins",
    price: 499,
    origPrice: 699,
    burn: "25 Hours",
    badge: "Spiced",
    notes: { top: "Grated Nutmeg", heart: "Ceylon Cinnamon Bark", base: "Clove Buds, Honey" },
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    desc: "A warm, comforting spice companion designed to turn rainy afternoons into fireside moments."
  },
  {
    id: 16,
    title: "Cornish Sea Salt & Driftwood Tin",
    category: "Travel Tins",
    price: 549,
    origPrice: 749,
    burn: "25 Hours",
    badge: "Fresh",
    notes: { top: "Ocean Sea Spray", heart: "Wild Coastal Sage", base: "Weathered Driftwood" },
    image: "asset/four.jpg",
    desc: "Crisp marine air mixed with coastal herbs, bringing the grounding freshness of the sea anywhere."
  },
  {
    id: 17,
    title: "Dark Amber & Musk Tin",
    category: "Travel Tins",
    price: 499,
    origPrice: 649,
    burn: "25 Hours",
    badge: "Warm",
    notes: { top: "Bergamot Zest", heart: "Liquid Amber", base: "Sultry Cashmere Musk" },
    image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=700&q=80",
    desc: "Compact in size, but produces a powerful hot scent throw suited for intimate bedroom environments."
  },
  {
    id: 18,
    title: "Madurai Mogra & Marigold Tin",
    category: "Travel Tins",
    price: 549,
    origPrice: 699,
    burn: "25 Hours",
    badge: "Floral",
    notes: { top: "Morning Marigold", heart: "Madurai Jasmine Sambac", base: "White Musk" },
    image: "asset/one.jpg",
    desc: "Authentic floral extract from southern India offering a serene, meditative bloom."
  },

  // 19-24: Gift Hampers & Bundles
  {
    id: 19,
    title: "The Royal Discovery Trio",
    category: "Gift Hampers",
    price: 2499,
    origPrice: 2999,
    burn: "75 Hours Combined",
    badge: "Best Value",
    notes: { top: "3 Assorted Candles", heart: "Vanilla, Oud, & Lavender", base: "Gold Foil Box" },
    image: "asset/third.jpg",
    desc: "Our three best-selling fragrances housed in a rigid velvet-finish box with gold lettering."
  },
  {
    id: 20,
    title: "Festive Gold Luxury Hamper",
    category: "Gift Hampers",
    price: 3499,
    origPrice: 4299,
    burn: "110 Hours",
    badge: "Festive Box",
    notes: { top: "Saffron & Royal Oud Jars", heart: "Solid Brass Wick Trimmer", base: "Match Striker" },
    image: "asset/second.jpg",
    desc: "An elaborate gifting ensemble featuring our premier candles, brass tools, and handcrafted matches."
  },
  {
    id: 21,
    title: "Bridal Romance Gift Suite",
    category: "Gift Hampers",
    price: 2799,
    origPrice: 3499,
    burn: "90 Hours",
    badge: "Wedding",
    notes: { top: "Rose Petals & Champagne", heart: "White Tea & Thyme", base: "Silk Ribbon Packaging" },
    image: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=700&q=80",
    desc: "Curated specifically for wedding gifts and bridal vanity setups with romantic, airy accords."
  },
  {
    id: 22,
    title: "Four Seasons Tin Set",
    category: "Gift Hampers",
    price: 1899,
    origPrice: 2399,
    burn: "100 Hours",
    badge: "Set of 4",
    notes: { top: "4 Travel Tins", heart: "Spring, Summer, Fall, Winter", base: "Magnetic Keepsake Box" },
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    desc: "A year-round journey featuring one scent tailored for each seasonal mood shift."
  },
  {
    id: 23,
    title: "Candle Care & Brass Tool Kit",
    category: "Gift Hampers",
    price: 1699,
    origPrice: 2199,
    burn: "Includes 1 Full Jar",
    badge: "Accessories",
    notes: { top: "Wick Trimmer", heart: "Bell Snuffer & Wick Dipper", base: "Midnight Oud Candle" },
    image: "asset/four.jpg",
    desc: "Electroplated matte-gold stainless tools to maintain clean wick burns and extend jar longevity."
  },
  {
    id: 24,
    title: "Bespoke Couple's Discovery Set",
    category: "Gift Hampers",
    price: 2999,
    origPrice: 3699,
    burn: "100 Hours",
    badge: "Anniversary",
    notes: { top: "His: Smoked Oak", heart: "Hers: Cashmere Vanilla", base: "Engraved Wooden Coasters" },
    image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=700&q=80",
    desc: "Harmonizing masculine and feminine olfactory profiles that scent shared spaces in tandem."
  },

  // 25-30: Aromatherapy & Wellness
  {
    id: 25,
    title: "Deep Sleep & Valerian Root",
    category: "Aromatherapy",
    price: 1199,
    origPrice: 1499,
    burn: "50 Hours",
    badge: "Sleep Aid",
    notes: { top: "Sweet Chamomile", heart: "Valerian Root Extract", base: "Sandalwood, Ylang Ylang" },
    image: "asset/one.jpg",
    desc: "Formulated backed by sleep science studies to downregulate nervous system tension before rest."
  },
  {
    id: 26,
    title: "Clarity: Sicilian Lemon & Rosemary",
    category: "Aromatherapy",
    price: 1099,
    origPrice: 1399,
    burn: "50 Hours",
    badge: "Focus",
    notes: { top: "Zesty Lemon Peel", heart: "Crushed Garden Rosemary", base: "White Pine Needles" },
    image: "asset/second.jpg",
    desc: "Stimulates mental alertness and eliminates midday cognitive fatigue during focused work."
  },
  {
    id: 27,
    title: "De-Stress: Bergamot & Holy Basil",
    category: "Aromatherapy",
    price: 1149,
    origPrice: 1449,
    burn: "50 Hours",
    badge: "Anti-Stress",
    notes: { top: "Calabrian Bergamot", heart: "Indian Tulsi (Holy Basil)", base: "Earthy Patchouli" },
    image: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=700&q=80",
    desc: "An adaptogenic herbal blend engineered to relieve cortisol build-up after stressful commutes."
  },
  {
    id: 28,
    title: "Meditation: Frankincense & Myrrh",
    category: "Aromatherapy",
    price: 1299,
    origPrice: 1599,
    burn: "55 Hours",
    badge: "Sacred",
    notes: { top: "Somali Frankincense", heart: "Aromatic Myrrh Resin", base: "Golden Labdanum" },
    image: "asset/third.jpg",
    desc: "Ancient resinous fragrances historically burned in sanctums to aid breathwork and mindfulness."
  },
  {
    id: 29,
    title: "Breathe: Eucalyptus & Camphor",
    category: "Aromatherapy",
    price: 1049,
    origPrice: 1299,
    burn: "50 Hours",
    badge: "Respiratory",
    notes: { top: "White Camphor Vapor", heart: "Eucalyptus Globulus", base: "Natural Menthol Crystals" },
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    desc: "Opens constricted nasal passages and relieves seasonal congestion with clean essential oil vapors."
  },
  {
    id: 30,
    title: "Joy: Orange Blossom & Ylang Ylang",
    category: "Aromatherapy",
    price: 1199,
    origPrice: 1449,
    burn: "50 Hours",
    badge: "Mood Lift",
    notes: { top: "Mandarin Peel", heart: "Madagascan Ylang Ylang", base: "Warm Tonka Bean" },
    image: "asset/four.jpg",
    desc: "A warm, uplifting floral arrangement that sparks optimism and cozy domestic celebration."
  }
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

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(CANDLE_INVENTORY);
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
});