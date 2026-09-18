/* =========================================================
   THE CANDLEIER — CLIENT ACCOUNT PAGE LOGIC
   Renders Dashboard, Orders, Order Details, Addresses, & Profile
   Powered by ShopifyService
   ========================================================= */

(function () {
  'use strict';

  // Format currency in Indian Rupees (INR)
  function formatINR(num) {
    const n = Math.round(Number(num) || 0);
    return '₹' + n.toLocaleString('en-IN');
  }

  // Format date
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  // Generate Monogram Initials
  function getInitials(first = '', last = '') {
    const f = first.trim().charAt(0) || '';
    const l = last.trim().charAt(0) || '';
    return (f + l).toUpperCase() || 'C';
  }

  // Format Status Badge
  function renderStatusBadge(status) {
    const s = String(status || '').toUpperCase();
    if (s.includes('DELIVERED') || s === 'FULFILLED') {
      return `<span class="status-pill status-delivered">● Delivered</span>`;
    }
    if (s.includes('OUT_FOR_DELIVERY') || s.includes('OUT FOR DELIVERY')) {
      return `<span class="status-pill status-out_for_delivery">● Out for Delivery</span>`;
    }
    if (s.includes('SHIP') || s.includes('TRANSIT')) {
      return `<span class="status-pill status-shipped">● In Transit</span>`;
    }
    return `<span class="status-pill status-processing">● Processing</span>`;
  }

  // -----------------------------------------------------------
  // 1. DASHBOARD PAGE (account.html)
  // -----------------------------------------------------------
  async function initDashboard() {
    const container = document.getElementById('accountDashboard');
    if (!container) return;

    const customer = await window.ShopifyService.requireAuth('account.html');
    if (!customer) return;

    // Set Welcome Header
    const nameEl = document.getElementById('customerFullName');
    const emailEl = document.getElementById('customerEmail');
    const memberSinceEl = document.getElementById('customerMemberSince');
    const monogramEl = document.getElementById('customerMonogram');
    const tierEl = document.getElementById('customerTier');

    if (nameEl) nameEl.textContent = customer.displayName || `${customer.firstName} ${customer.lastName}`.trim() || 'Valued Client';
    if (emailEl) emailEl.textContent = customer.email || '';
    if (memberSinceEl) memberSinceEl.textContent = formatDate(customer.createdAt) || '2026';
    if (monogramEl) monogramEl.textContent = getInitials(customer.firstName, customer.lastName);
    if (tierEl) tierEl.textContent = customer.tier || 'Sanctuary Connoisseur';

    // Render Recent Order Preview
    const recentOrderWrap = document.getElementById('recentOrderContainer');
    if (recentOrderWrap) {
      const orders = customer.orders || [];
      if (orders.length > 0) {
        const o = orders[0];
        const firstItem = o.lineItems?.[0] || { title: 'Botanical Candle', image: 'asset/one.jpg' };
        const totalItemsCount = (o.lineItems || []).reduce((acc, i) => acc + (i.quantity || 1), 0);
        const moreItemsText = totalItemsCount > 1 ? ` + ${totalItemsCount - 1} more item${totalItemsCount > 2 ? 's' : ''}` : '';

        recentOrderWrap.innerHTML = `
          <div class="recent-order-preview-card">
            <div class="order-thumb-wrap">
              <img src="${firstItem.image || 'asset/one.jpg'}" alt="${firstItem.title}" onerror="this.src='asset/one.jpg'" />
            </div>
            <div class="order-preview-meta">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <span class="order-num">${o.orderNumber || o.name}</span>
                <span class="order-date">• Placed on ${formatDate(o.processedAt)}</span>
                ${renderStatusBadge(o.fulfillmentStatus)}
              </div>
              <div class="order-items-summary">
                ${firstItem.title}${moreItemsText}
              </div>
              <div class="order-total-price">
                Total: ${formatINR(o.totalPrice)}
              </div>
            </div>
            <div class="order-preview-actions">
              <a href="order-details.html?id=${encodeURIComponent(o.orderNumber || o.id)}" class="btn btn-outline dark-outline" style="padding: 0.65rem 1rem; font-size: 0.72rem;">
                View Details
              </a>
              <a href="tracking.html?order=${encodeURIComponent(o.orderNumber || o.name)}" class="btn btn-gold" style="padding: 0.65rem 1rem; font-size: 0.72rem;">
                Track Parcel
              </a>
            </div>
          </div>
        `;
      } else {
        recentOrderWrap.innerHTML = `
          <div class="account-empty-state">
            <svg class="empty-state-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <h3 class="empty-state-title">No Orders Placed Yet</h3>
            <p class="empty-state-desc">Your sanctuary journey begins here. Explore our handcrafted botanical soy fragrances poured in micro-batches.</p>
            <a href="full-catalog.html" class="btn btn-gold">Explore Fragrances</a>
          </div>
        `;
      }
    }

    // Default Address preview on dashboard
    const addressWrap = document.getElementById('dashboardAddressContainer');
    if (addressWrap) {
      const def = customer.defaultAddress || customer.addresses?.[0];
      if (def) {
        addressWrap.innerHTML = `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:6px; padding:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <strong style="font-size:0.95rem; color:var(--cabernet);">${def.firstName} ${def.lastName || ''}</strong>
                <span class="address-tag tag-default">Default Delivery</span>
              </div>
              <p style="margin:0; font-size:0.84rem; color:var(--text-muted); line-height:1.5;">
                ${def.address1}${def.address2 ? ', ' + def.address2 : ''}<br />
                ${def.city}, ${def.province || ''} – ${def.zip || ''}, ${def.country || 'India'}<br />
                Phone: ${def.phone || '—'}
              </p>
            </div>
            <a href="addresses.html" class="btn-link-action">Manage Addresses →</a>
          </div>
        `;
      } else {
        addressWrap.innerHTML = `
          <div style="background:#FFFFFF; border:1px solid var(--border-subtle); border-radius:6px; padding:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <strong style="font-size:0.95rem; color:var(--cabernet);">No delivery address saved yet</strong>
              <p style="margin:4px 0 0; font-size:0.84rem; color:var(--text-muted);">Add an address for seamless single-click checkout on future botanical orders.</p>
            </div>
            <a href="addresses.html" class="btn btn-outline dark-outline" style="padding:0.6rem 1.2rem; font-size:0.74rem;">+ Add Address</a>
          </div>
        `;
      }
    }
  }

  // -----------------------------------------------------------
  // 2. ORDERS LIST PAGE (orders.html)
  // -----------------------------------------------------------
  async function initOrdersPage() {
    const listContainer = document.getElementById('ordersListContainer');
    if (!listContainer) return;

    const customer = await window.ShopifyService.requireAuth('orders.html');
    if (!customer) return;

    const orders = customer.orders || [];
    let currentFilter = 'ALL';

    function renderOrders(filter = 'ALL') {
      let filtered = orders;
      if (filter === 'IN_TRANSIT') {
        filtered = orders.filter(o => !String(o.fulfillmentStatus).toUpperCase().includes('DELIVERED'));
      } else if (filter === 'DELIVERED') {
        filtered = orders.filter(o => String(o.fulfillmentStatus).toUpperCase().includes('DELIVERED'));
      }

      if (filtered.length === 0) {
        listContainer.innerHTML = `
          <div class="account-empty-state">
            <svg class="empty-state-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"></path>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <h3 class="empty-state-title">No Orders Found</h3>
            <p class="empty-state-desc">You have no orders matching the selected status filter.</p>
            <a href="full-catalog.html" class="btn btn-gold">Shop Botanical Candles</a>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filtered.map(o => {
        const itemsHtml = (o.lineItems || []).map(li => `
          <div class="order-item-line">
            <div class="order-thumb-wrap" style="width:65px; height:65px;">
              <img src="${li.image || 'asset/one.jpg'}" alt="${li.title}" onerror="this.src='asset/one.jpg'" />
            </div>
            <div class="order-item-info">
              <h4 class="order-item-title">${li.title}</h4>
              <div class="order-item-variant">${li.variantTitle || 'Botanical Soy Wax'} • Qty: ${li.quantity}</div>
            </div>
            <div class="order-item-pricing">
              ${formatINR(li.price * (li.quantity || 1))}
            </div>
          </div>
        `).join('');

        return `
          <div class="order-card-row">
            <div class="order-card-header">
              <div>
                <span style="font-size: 0.88rem; font-weight: 700; color: var(--cabernet); letter-spacing: 0.5px;">${o.orderNumber || o.name}</span>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                  Placed on ${formatDate(o.processedAt)} • Payment: <strong style="color:var(--text-dark);">${o.paymentMethod || 'Prepaid'}</strong>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="status-pill status-paid">Paid</span>
                ${renderStatusBadge(o.fulfillmentStatus)}
              </div>
            </div>

            <div class="order-items-table">
              ${itemsHtml}
            </div>

            <div class="order-card-footer">
              <div style="font-size: 1rem; color: var(--cabernet); font-weight: 700;">
                Total: <span style="color: var(--maroon-light);">${formatINR(o.totalPrice)}</span>
              </div>
              <div class="actions-group">
                <a href="order-details.html?id=${encodeURIComponent(o.orderNumber || o.id)}" class="btn btn-outline dark-outline" style="padding: 0.65rem 1.2rem; font-size: 0.74rem;">
                  View Order Details
                </a>
                <a href="tracking.html?order=${encodeURIComponent(o.orderNumber || o.name)}" class="btn btn-gold" style="padding: 0.65rem 1.2rem; font-size: 0.74rem;">
                  Track Parcel
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    renderOrders('ALL');

    // Filter pill buttons
    document.querySelectorAll('.order-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.order-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.getAttribute('data-filter') || 'ALL';
        renderOrders(f);
      });
    });
  }

  // -----------------------------------------------------------
  // 3. ORDER DETAILS PAGE (order-details.html)
  // -----------------------------------------------------------
  async function initOrderDetailsPage() {
    const wrap = document.getElementById('orderDetailsWrapper');
    if (!wrap) return;

    const customer = await window.ShopifyService.requireAuth('order-details.html');
    if (!customer) return;

    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('id');

    const order = await window.ShopifyService.getOrder(targetId);

    if (!order) {
      wrap.innerHTML = `
        <div class="account-empty-state">
          <h3 class="empty-state-title">Order Not Found</h3>
          <p class="empty-state-desc">We couldn't locate the requested order. It may have been archived or linked to another account.</p>
          <a href="orders.html" class="btn btn-gold">Back to My Orders</a>
        </div>
      `;
      return;
    }

    const itemsHtml = (order.lineItems || []).map(li => `
      <div class="order-item-line" style="padding: 1rem 0; border-bottom: 1px solid var(--border-subtle);">
        <div class="order-thumb-wrap" style="width: 75px; height: 75px;">
          <img src="${li.image || 'asset/one.jpg'}" alt="${li.title}" onerror="this.src='asset/one.jpg'" />
        </div>
        <div class="order-item-info">
          <h4 class="order-item-title" style="font-size: 1rem;">${li.title}</h4>
          <div class="order-item-variant">${li.variantTitle || 'Botanical Soy Wax'}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
            ${formatINR(li.price)} × ${li.quantity}
          </div>
        </div>
        <div class="order-item-pricing" style="font-size: 1.05rem;">
          ${formatINR(li.price * (li.quantity || 1))}
        </div>
      </div>
    `).join('');

    const addr = order.shippingAddress || customer.defaultAddress || {
      name: customer.displayName || 'Delivery Recipient',
      address1: '12 Botanical Gardens Avenue',
      city: 'New Delhi',
      province: 'Delhi',
      zip: '110001',
      country: 'India',
      phone: customer.phone || ''
    };

    wrap.innerHTML = `
      <div class="account-header-bar">
        <div>
          <div class="account-breadcrumb">
            <a href="account.html">Account</a>
            <span>/</span>
            <a href="orders.html">Orders</a>
            <span>/</span>
            <span>${order.orderNumber || order.name}</span>
          </div>
          <h1 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--cabernet); margin: 0 0 0.4rem;">
            Order ${order.orderNumber || order.name}
          </h1>
          <div style="font-size: 0.86rem; color: var(--text-muted);">
            Placed on ${formatDate(order.processedAt)} • Financial Status: <strong style="color: #166534;">PAID</strong>
          </div>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          ${renderStatusBadge(order.fulfillmentStatus)}
          <a href="tracking.html?order=${encodeURIComponent(order.orderNumber || order.name)}" class="btn btn-gold" style="padding: 0.65rem 1.25rem; font-size: 0.74rem;">
            Track Shipment
          </a>
        </div>
      </div>

      <div class="order-details-grid">
        <!-- Left: Items & Pricing -->
        <div>
          <div class="details-panel">
            <h3 class="details-panel-title">Items in Shipment</h3>
            <div style="display: flex; flex-direction: column;">
              ${itemsHtml}
            </div>
          </div>

          <div class="details-panel">
            <h3 class="details-panel-title">Payment Summary</h3>
            <div class="price-summary-row">
              <span>Subtotal</span>
              <span>${formatINR(order.subtotalPrice || order.totalPrice)}</span>
            </div>
            <div class="price-summary-row">
              <span>Standard Express Delivery</span>
              <span style="color: #166534; font-weight: 600;">FREE (Orders &gt; ₹999)</span>
            </div>
            <div class="price-summary-row">
              <span>Estimated Taxes (GST Included)</span>
              <span>${formatINR(order.totalTax || 0)}</span>
            </div>
            <div class="price-summary-row total-row">
              <span>Total Paid</span>
              <span>${formatINR(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        <!-- Right: Shipping & Logistics Info -->
        <div>
          <div class="details-panel">
            <h3 class="details-panel-title">Delivery Address</h3>
            <strong style="font-size: 0.95rem; color: var(--cabernet); display: block; margin-bottom: 0.35rem;">
              ${addr.name || (addr.firstName + ' ' + (addr.lastName || ''))}
            </strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin: 0 0 1rem;">
              ${addr.address1 || ''}${addr.address2 ? ', ' + addr.address2 : ''}<br />
              ${addr.city || ''}, ${addr.province || ''} – ${addr.zip || ''}<br />
              ${addr.country || 'India'}<br />
              Phone: ${addr.phone || '—'}
            </p>
          </div>

          <div class="details-panel">
            <h3 class="details-panel-title">Logistics &amp; Courier</h3>
            <div style="font-size: 0.85rem; line-height: 1.6; color: var(--text-muted);">
              <div>Courier Partner: <strong style="color: var(--cabernet);">${order.tracking?.courier || 'Bluedart Express'}</strong></div>
              <div style="margin-top: 4px;">Tracking Number: <strong style="color: var(--cabernet);">${order.tracking?.trackingNumber || 'BLUEDART-9842105'}</strong></div>
              <div style="margin-top: 4px;">Estimated Arrival: <strong style="color: var(--cabernet);">${order.tracking?.estimatedDelivery || '18 Sep 2026'}</strong></div>
            </div>
            <a href="tracking.html?order=${encodeURIComponent(order.orderNumber || order.name)}" class="btn btn-outline dark-outline btn-block" style="margin-top: 1.25rem; font-size: 0.72rem; padding: 0.7rem 1rem;">
              View Live Timeline →
            </a>
          </div>

          <div class="details-panel" style="background: var(--bg-cream);">
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--cabernet); margin: 0 0 0.4rem;">Need Concierge Assistance?</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0 0 1rem; line-height: 1.5;">
              Our bespoke concierge team is available to assist with custom gifts, delivery rescheduling, or olfactory guidance.
            </p>
            <a href="contact-us.html" class="btn-link-action">Message Concierge Desk →</a>
          </div>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------
  // 4. SAVED ADDRESSES PAGE (addresses.html)
  // -----------------------------------------------------------
  async function initAddressesPage() {
    const grid = document.getElementById('addressesGrid');
    if (!grid) return;

    const customer = await window.ShopifyService.requireAuth('addresses.html');
    if (!customer) return;

    function renderAddressList() {
      const addrs = customer.addresses || [];
      if (addrs.length === 0) {
        grid.innerHTML = `
          <div class="account-empty-state" style="grid-column: 1 / -1;">
            <svg class="empty-state-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h3 class="empty-state-title">No Delivery Addresses Saved</h3>
            <p class="empty-state-desc">Save your residence or gifting addresses for effortless checkout across our botanical collections.</p>
            <button type="button" class="btn btn-gold" id="emptyAddBtn">+ Add New Address</button>
          </div>
        `;
        document.getElementById('emptyAddBtn')?.addEventListener('click', () => openAddressModal());
        return;
      }

      grid.innerHTML = addrs.map(a => {
        const isDef = Boolean(a.isDefault || customer.defaultAddress?.id === a.id);
        return `
          <div class="address-card ${isDef ? 'is-default' : ''}" data-id="${a.id}">
            <div>
              <div class="address-card-header">
                <span class="address-tag ${isDef ? 'tag-default' : ''}">
                  ${isDef ? '★ Default Delivery' : (a.tag || 'Address')}
                </span>
                ${!isDef ? `
                  <button type="button" class="btn-link-action set-default-btn" data-id="${a.id}">
                    Set As Default
                  </button>
                ` : ''}
              </div>

              <h4 class="address-recipient">${a.firstName} ${a.lastName || ''}</h4>
              <div class="address-lines">
                ${a.address1}${a.address2 ? ', ' + a.address2 : ''}<br />
                ${a.city}, ${a.province || ''} – ${a.zip || ''}<br />
                ${a.country || 'India'}<br />
                <strong>Contact:</strong> ${a.phone || '—'}
              </div>
            </div>

            <div class="address-card-actions">
              <button type="button" class="btn-link-action edit-addr-btn" data-id="${a.id}">
                Edit Address
              </button>
              <span style="color: var(--border-subtle);">|</span>
              <button type="button" class="btn-link-action text-danger delete-addr-btn" data-id="${a.id}">
                Delete
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Attach handlers
      grid.querySelectorAll('.set-default-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          await window.ShopifyService.setDefaultAddress(id);
          initAddressesPage();
        });
      });

      grid.querySelectorAll('.delete-addr-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          if (confirm('Are you sure you wish to delete this delivery address from your profile?')) {
            await window.ShopifyService.deleteAddress(id);
            initAddressesPage();
          }
        });
      });

      grid.querySelectorAll('.edit-addr-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const addr = (customer.addresses || []).find(a => a.id === id);
          if (addr) openAddressModal(addr);
        });
      });
    }

    renderAddressList();

    // Modal logic
    const modalOverlay = document.getElementById('addressModalOverlay');
    const modalForm = document.getElementById('addressForm');
    const modalTitle = document.getElementById('addressModalTitle');
    let editingId = null;

    function openAddressModal(addr = null) {
      if (!modalOverlay || !modalForm) return;
      editingId = addr ? addr.id : null;
      modalTitle.textContent = addr ? 'Edit Delivery Address' : 'Add New Delivery Address';

      document.getElementById('addrFirstName').value = addr?.firstName || '';
      document.getElementById('addrLastName').value = addr?.lastName || '';
      document.getElementById('addrPhone').value = addr?.phone || '';
      document.getElementById('addrLine1').value = addr?.address1 || '';
      document.getElementById('addrLine2').value = addr?.address2 || '';
      document.getElementById('addrCity').value = addr?.city || '';
      document.getElementById('addrProvince').value = addr?.province || '';
      document.getElementById('addrZip').value = addr?.zip || '';
      document.getElementById('addrDefaultCheck').checked = Boolean(addr?.isDefault || customer.addresses?.length === 0);

      modalOverlay.classList.add('active');
    }

    function closeAddressModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('active');
      modalForm?.reset();
      editingId = null;
    }

    document.getElementById('addNewAddressBtn')?.addEventListener('click', () => openAddressModal());
    document.getElementById('closeAddressModalBtn')?.addEventListener('click', closeAddressModal);
    document.getElementById('cancelAddressModalBtn')?.addEventListener('click', closeAddressModal);

    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeAddressModal();
    });

    modalForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      const payload = {
        firstName: document.getElementById('addrFirstName').value.trim(),
        lastName: document.getElementById('addrLastName').value.trim(),
        phone: document.getElementById('addrPhone').value.trim(),
        address1: document.getElementById('addrLine1').value.trim(),
        address2: document.getElementById('addrLine2').value.trim(),
        city: document.getElementById('addrCity').value.trim(),
        province: document.getElementById('addrProvince').value.trim(),
        zip: document.getElementById('addrZip').value.trim(),
        country: 'India',
        isDefault: document.getElementById('addrDefaultCheck').checked
      };

      try {
        if (editingId) {
          await window.ShopifyService.updateAddress(editingId, payload);
        } else {
          await window.ShopifyService.addAddress(payload);
        }
        closeAddressModal();
        initAddressesPage();
      } catch (err) {
        alert('Could not save address: ' + (err.message || 'Please verify form fields.'));
      } finally {
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        }
      }
    });
  }

  // -----------------------------------------------------------
  // 5. EDIT PROFILE PAGE (edit-profile.html)
  // -----------------------------------------------------------
  async function initProfilePage() {
    const form = document.getElementById('editProfileForm');
    if (!form) return;

    const customer = await window.ShopifyService.requireAuth('edit-profile.html');
    if (!customer) return;

    const fNameInput = document.getElementById('profileFirstName');
    const lNameInput = document.getElementById('profileLastName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const bannerContainer = document.getElementById('profileAlertContainer');

    if (fNameInput) fNameInput.value = customer.firstName || '';
    if (lNameInput) lNameInput.value = customer.lastName || '';
    if (emailInput) emailInput.value = customer.email || '';
    if (phoneInput) phoneInput.value = customer.phone || '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      if (bannerContainer) bannerContainer.innerHTML = '';

      try {
        await window.ShopifyService.updateProfile({
          firstName: fNameInput.value.trim(),
          lastName: lNameInput.value.trim(),
          phone: phoneInput.value.trim()
        });

        if (bannerContainer) {
          bannerContainer.innerHTML = `
            <div class="auth-alert-banner alert-success">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Your profile information has been updated successfully.</span>
            </div>
          `;
        }
      } catch (err) {
        if (bannerContainer) {
          bannerContainer.innerHTML = `
            <div class="auth-alert-banner alert-error">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>${err.message || 'Failed to update profile.'}</span>
            </div>
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        }
      }
    });
  }

  // -----------------------------------------------------------
  // 6. ORDER TRACKING PAGE (tracking.html)
  // -----------------------------------------------------------
  async function initTrackingPage() {
    const form = document.getElementById('trackingSearchForm');
    const input = document.getElementById('trackingInput');
    const resultWrap = document.getElementById('trackingResultContainer');
    if (!form || !input || !resultWrap) return;

    // Check query param (e.g. tracking.html?order=TC10234)
    const urlParams = new URLSearchParams(window.location.search);
    const orderQuery = urlParams.get('order') || urlParams.get('tracking') || urlParams.get('waybill');
    if (orderQuery) {
      input.value = orderQuery;
      doTrack(orderQuery);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (val) doTrack(val);
    });

    document.querySelectorAll('.sample-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-value') || chip.textContent.replace('#', '').trim();
        input.value = val;
        doTrack(val);
      });
    });

    async function doTrack(query) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      resultWrap.innerHTML = `
        <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
          <div class="btn is-loading" style="background:none; border:none; color:var(--maroon-light); font-size:1rem;">Retrieving logistics timeline...</div>
        </div>
      `;

      try {
        const res = await window.ShopifyService.trackShipment(query);

        if (!res || !res.found) {
          resultWrap.innerHTML = `
            <div class="account-empty-state">
              <svg class="empty-state-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 class="empty-state-title">No Shipment Found</h3>
              <p class="empty-state-desc">We couldn't locate active dispatch records for <strong>"${query}"</strong>. Please verify your Order ID or Courier Waybill Number.</p>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.5rem;">
                Need help? Email concierge at <a href="mailto:support@thecandleier.com" style="color:var(--maroon-light);">support@thecandleier.com</a>
              </p>
            </div>
          `;
          return;
        }

        const timelineHtml = (res.timeline || []).map(step => {
          const isComp = step.completed;
          const isAct = step.active;
          const statusClass = isComp ? 'completed' : (isAct ? 'active' : '');
          const nodeIcon = isComp ? '✓' : (isAct ? '●' : '○');

          return `
            <div class="timeline-step-item ${statusClass}">
              <div class="timeline-node-icon">${nodeIcon}</div>
              <h4 class="timeline-step-title">${step.step}</h4>
              <p class="timeline-step-desc">${step.description}</p>
              <span class="timeline-step-time">${step.date}</span>
            </div>
          `;
        }).join('');

        resultWrap.innerHTML = `
          <div class="tracking-result-card">
            <div class="shipment-overview-header">
              <div>
                <span class="section-pretitle">Shipment Registry</span>
                <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--cabernet); margin: 0 0 0.3rem;">
                  Order ${res.orderNumber || query}
                </h3>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  Courier Partner: <strong style="color: var(--cabernet);">${res.courier}</strong> • Waybill: <strong style="color: var(--cabernet);">${res.trackingNumber}</strong>
                </div>
              </div>
              <div>
                ${renderStatusBadge(res.status)}
              </div>
            </div>

            <div class="shipment-meta-grid">
              <div class="meta-item">
                <label>Estimated Arrival</label>
                <span>${res.estimatedDelivery || 'In Transit'}</span>
              </div>
              <div class="meta-item">
                <label>Destination Hub</label>
                <span>${res.destination || 'India'}</span>
              </div>
              <div class="meta-item">
                <label>Logistics Mode</label>
                <span>Air Express Cargo</span>
              </div>
            </div>

            <div class="tracking-timeline">
              ${timelineHtml}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
              <div style="font-size: 0.84rem; color: var(--text-muted);">
                Delivery requires secure recipient verification.
              </div>
              <a href="order-details.html?id=${encodeURIComponent(res.orderNumber || query)}" class="btn btn-outline dark-outline" style="padding: 0.65rem 1.25rem; font-size: 0.74rem;">
                View Complete Order Details →
              </a>
            </div>
          </div>
        `;
      } catch (e) {
        resultWrap.innerHTML = `
          <div class="account-empty-state">
            <h3 class="empty-state-title">Tracking Temporarily Unavailable</h3>
            <p class="empty-state-desc">${e.message || 'Please check your connection and try again.'}</p>
          </div>
        `;
      } finally {
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        }
      }
    }
  }

  // Page Routing & Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    initOrdersPage();
    initOrderDetailsPage();
    initAddressesPage();
    initProfilePage();
    initTrackingPage();
  });

})();
