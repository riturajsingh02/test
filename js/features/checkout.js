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

async function createShopifyCheckout(items) {
  try {
    const endpoint = `https://${CANDLEIER_CONFIG.shopifyStoreDomain}/api/${CANDLEIER_CONFIG.shopifyApiVersion}/graphql.json`;
    const lines = items
      .filter(item => item.shopifyVariantId)
      .map(item => ({ quantity: item.qty, merchandiseId: item.shopifyVariantId }));
    if (!lines.length) return null;

    const mutation = `mutation CartCreate($lines: [CartLineInput!]) { cartCreate(input: {lines: $lines}) { cart { checkoutUrl } userErrors { message } } }`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': CANDLEIER_CONFIG.shopifyStorefrontToken },
      body: JSON.stringify({ query: mutation, variables: { lines } })
    });
    const data = await response.json();
    return data?.data?.cartCreate?.cart?.checkoutUrl || null;
  } catch (error) {
    console.error('Shopify checkout error:', error);
    return null;
  }
}

async function processOrder(e) {
  e.preventDefault();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  /* If Shopify Storefront credentials are provided, the cart/checkout can be handed to Shopify here. */
  if (CANDLEIER_CONFIG.shopifyStoreDomain && CANDLEIER_CONFIG.shopifyStorefrontToken) {
    showToast('Connecting to secure Shopify checkout…');
    const checkoutUrl = await createShopifyCheckout(cart);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }
  }

  showToast(`Checkout is ready for ₹${subtotal.toLocaleString('en-IN')}. Connect the Shopify Storefront token to enable live checkout.`);
}
