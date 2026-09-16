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
    closeAccountModal();
    closeTrackModal();
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

  // Customer account & tracking
  document.getElementById('accountTrigger')?.addEventListener('click', openAccountModal);
  document.getElementById('mobileAccountTrigger')?.addEventListener('click', () => { toggleMobileDrawer(false); openAccountModal(); });
  document.getElementById('footerAccountTrigger')?.addEventListener('click', openAccountModal);
  document.getElementById('trackTrigger')?.addEventListener('click', openTrackModal);
  document.getElementById('mobileTrackTrigger')?.addEventListener('click', () => { toggleMobileDrawer(false); openTrackModal(); });
  document.getElementById('footerTrackTrigger')?.addEventListener('click', openTrackModal);
  dom.closeAccountBtn?.addEventListener('click', closeAccountModal);
  dom.closeTrackBtn?.addEventListener('click', closeTrackModal);
  dom.trackOrderForm?.addEventListener('submit', trackOrder);

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
      closeAccountModal();
      closeTrackModal();
    }
  });
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(CANDLE_INVENTORY);
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  setupKimiricaSections();
});

/* =========================================================
   KIMIRICA LUXURY SECTIONS LOGIC (RITUALS & NEW ARRIVALS)
   ========================================================= */
window.kmAddToCart = function (productId, btn) {
  if (typeof addToCart === 'function') {
    addToCart(productId);
  }
  if (btn) {
    const originalContent = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      <span>Added ✓</span>
    `;
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = originalContent;
    }, 1600);
  }
};

window.kmToggleWishlist = function (productId, btn) {
  if (typeof toggleWishlist === 'function') {
    toggleWishlist(productId);
  }
  if (btn) {
    const isSaved = Array.isArray(wishlist) && wishlist.includes(productId);
    btn.classList.toggle('active', isSaved);
  }
};

function setupKimiricaSections() {
  // 1. Rituals Section Carousel Scroll
  const ritualsTrack = document.getElementById('ritualsTrack');
  const ritualPrevBtn = document.getElementById('ritualPrevBtn');
  const ritualNextBtn = document.getElementById('ritualNextBtn');

  if (ritualsTrack && ritualPrevBtn && ritualNextBtn) {
    ritualPrevBtn.addEventListener('click', () => {
      const scrollAmt = ritualsTrack.clientWidth * 0.75;
      ritualsTrack.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    });
    ritualNextBtn.addEventListener('click', () => {
      const scrollAmt = ritualsTrack.clientWidth * 0.75;
      ritualsTrack.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    });
  }

  // 2. Rituals Category Filter Pills
  const ritualPills = document.querySelectorAll('#ritualFilterBar .km-pill');
  ritualPills.forEach(pill => {
    pill.addEventListener('click', () => {
      ritualPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filter = pill.dataset.ritualFilter;
      const cards = document.querySelectorAll('#ritualsTrack .km-ritual-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      if (ritualsTrack) ritualsTrack.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });

  // 3. New Arrivals Carousel Scroll
  const arrivalsTrack = document.getElementById('arrivalsTrack');
  const arrivalPrevBtn = document.getElementById('arrivalPrevBtn');
  const arrivalNextBtn = document.getElementById('arrivalNextBtn');

  if (arrivalsTrack && arrivalPrevBtn && arrivalNextBtn) {
    arrivalPrevBtn.addEventListener('click', () => {
      const scrollAmt = arrivalsTrack.clientWidth * 0.75;
      arrivalsTrack.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    });
    arrivalNextBtn.addEventListener('click', () => {
      const scrollAmt = arrivalsTrack.clientWidth * 0.75;
      arrivalsTrack.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    });
  }

  // 4. New Arrivals Category Filter Pills
  const arrivalPills = document.querySelectorAll('#arrivalFilterBar .km-pill');
  arrivalPills.forEach(pill => {
    pill.addEventListener('click', () => {
      arrivalPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filter = pill.dataset.arrivalFilter;
      const cards = document.querySelectorAll('#arrivalsTrack .km-product-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      if (arrivalsTrack) arrivalsTrack.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });
}

/* Sticky header scroll state */
(() => {
  const header = document.getElementById('header');
  if (!header) return;
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();

