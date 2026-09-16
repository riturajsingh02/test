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
