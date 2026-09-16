
/* =========================================================
   THE CANDLEIER — INTEGRATION SETTINGS
   Fill these values when the Shopify store/courier endpoints are ready.
   The page remains usable with the local demo inventory when blank.
   ========================================================= */
const CANDLEIER_CONFIG = {
  shopifyStoreDomain: '',
  shopifyStorefrontToken: '',
  shopifyApiVersion: '2026-01',
  customerAccountUrl: '/account',
  pincodeServiceabilityEndpoint: '',
  orderTrackingEndpoint: ''
};

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


/* Add presentation-safe product details without changing the existing inventory names/prices. */
CANDLE_INVENTORY.forEach(product => {
  product.dimensions = product.dimensions || (product.category === 'Travel Tins' ? '7 × 7 × 5 cm' : product.category === 'Gift Hampers' ? '24 × 18 × 10 cm' : '9 × 9 × 11 cm');
  product.stock = Number.isFinite(product.stock) ? product.stock : 20;
  product.variants = product.variants || [
    { id: `${product.id}-standard`, title: 'Standard', price: product.price, available: product.stock > 0 }
  ];
});
