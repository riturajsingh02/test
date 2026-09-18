/* =========================================================
   THE CANDLEIER — REUSABLE SHOPIFY SERVICE LAYER
   Customer Authentication, Storefront GraphQL API,
   Orders, Tracking, Profile, & Session Management.
   ========================================================= */

(function (window) {
  'use strict';

  const TOKEN_KEY = 'thecandleier_cust_token';
  const TOKEN_EXP_KEY = 'thecandleier_cust_token_exp';
  const CUST_CACHE_KEY = 'thecandleier_cust_profile';
  const DEMO_MODE_KEY = 'thecandleier_demo_active';

  // Fallback demo dataset used ONLY when Shopify Storefront API credentials
  // have not yet been provided in CANDLEIER_CONFIG, allowing full preview.
  const DEMO_CUSTOMER = {
    id: 'gid://shopify/Customer/7829104',
    firstName: '',
    lastName: '',
    displayName: 'Customer',
    email: '',
    phone: '',
    createdAt: '2026-01-15T10:00:00Z',
    tier: 'Sanctuary Connoisseur',
    defaultAddress: null,
    addresses: [],
    orders: [
      {
        id: 'gid://shopify/Order/8920194',
        orderNumber: 'TC10234',
        name: '#TC10234',
        processedAt: '2026-09-16T14:32:00Z',
        financialStatus: 'PAID',
        fulfillmentStatus: 'SHIPPED',
        currencyCode: 'INR',
        paymentMethod: 'UPI (Instant Confirmation)',
        shippingAddress: {
          name: 'Delivery Recipient',
          address1: '12 Botanical Gardens Avenue',
          address2: '',
          city: 'New Delhi',
          province: 'Delhi',
          zip: '110001',
          country: 'India',
          phone: ''
        },
        tracking: {
          courier: 'Bluedart Express',
          trackingNumber: 'BLUEDART-9842105',
          trackingUrl: 'https://www.bluedart.com',
          status: 'Out for Delivery',
          statusCode: 'out_for_delivery',
          estimatedDelivery: '18 September 2026',
          destination: 'New Delhi, Delhi',
          timeline: [
            { step: 'Order Confirmed', description: 'Artisan order verified and scheduled for pouring', date: '16 Sep 2026, 02:45 PM', completed: true },
            { step: 'Micro-Batch Pouring & Curing', description: 'Handcrafted with botanical soy wax & IFRA oils', date: '16 Sep 2026, 06:15 PM', completed: true },
            { step: 'Dispatched & In Transit', description: 'Handed over to Bluedart logistics hub', date: '17 Sep 2026, 09:20 AM', completed: true },
            { step: 'Out for Delivery', description: 'Courier executive is en route to your delivery address', date: '18 Sep 2026, 08:30 AM', active: true, completed: false },
            { step: 'Delivered', description: 'Package handed over with secure OTP', date: 'Estimated by 04:00 PM today', completed: false }
          ]
        },
        lineItems: [
          {
            id: 'line_1',
            title: 'Golden Glow Votives – Set of 2',
            variantTitle: 'Natural Botanical Soy Wax (30-55 Hours)',
            quantity: 1,
            price: 279,
            image: 'asset/one.jpg'
          },
          {
            id: 'line_2',
            title: 'Diamond Glow Jar – Amber',
            variantTitle: 'Warm Cashmere & Amber (50 Hours)',
            quantity: 1,
            price: 849,
            image: 'asset/second.jpg'
          }
        ],
        subtotalPrice: 1128,
        shippingPrice: 0,
        totalTax: 171,
        totalPrice: 1128
      },
      {
        id: 'gid://shopify/Order/8710291',
        orderNumber: 'TC10189',
        name: '#TC10189',
        processedAt: '2026-08-28T11:15:00Z',
        financialStatus: 'PAID',
        fulfillmentStatus: 'DELIVERED',
        currencyCode: 'INR',
        paymentMethod: 'Credit Card (Visa)',
        shippingAddress: {
          name: 'Delivery Recipient',
          address1: '12 Botanical Gardens Avenue',
          address2: '',
          city: 'New Delhi',
          province: 'Delhi',
          zip: '110001',
          country: 'India',
          phone: ''
        },
        tracking: {
          courier: 'Delhivery Surface',
          trackingNumber: 'DELHIVERY-4481029',
          trackingUrl: 'https://www.delhivery.com',
          status: 'Delivered',
          statusCode: 'delivered',
          estimatedDelivery: '31 August 2026',
          destination: 'New Delhi, Delhi',
          timeline: [
            { step: 'Order Confirmed', description: 'Order confirmed and verified', date: '28 Aug 2026', completed: true },
            { step: 'Micro-Batch Pouring', description: 'Handcrafted in artisan workshop', date: '28 Aug 2026', completed: true },
            { step: 'Dispatched', description: 'Dispatched via Delhivery Express', date: '29 Aug 2026', completed: true },
            { step: 'Out for Delivery', description: 'Out for delivery', date: '31 Aug 2026', completed: true },
            { step: 'Delivered', description: 'Delivered to resident at recipient address', date: '31 Aug 2026, 03:20 PM', completed: true }
          ]
        },
        lineItems: [
          {
            id: 'line_3',
            title: 'Classic Pillar – Black – 9"',
            variantTitle: 'Obsidian Velvet & Midnight Oud',
            quantity: 1,
            price: 1549,
            image: 'asset/four.jpg'
          }
        ],
        subtotalPrice: 1549,
        shippingPrice: 0,
        totalTax: 236,
        totalPrice: 1549
      }
    ]
  };

  const ShopifyService = {
    // Config getter
    getConfig: function () {
      const globalConfig = window.CANDLEIER_CONFIG || {};
      return {
        storeDomain: globalConfig.shopifyStoreDomain || '',
        storefrontToken: globalConfig.shopifyStorefrontToken || '',
        apiVersion: globalConfig.shopifyApiVersion || '2024-07',
        trackingEndpoint: globalConfig.orderTrackingEndpoint || ''
      };
    },

    isConfigured: function () {
      const cfg = this.getConfig();
      return Boolean(cfg.storeDomain && cfg.storefrontToken);
    },

    // Session Management
    getToken: function () {
      return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
    },

    setSession: function (token, expiresAt, remember) {
      // Store in both localStorage and sessionStorage so sessions persist reliably
      // across iframe reloads, navigation, and new tabs in all browser environments
      localStorage.setItem(TOKEN_KEY, token);
      if (expiresAt) localStorage.setItem(TOKEN_EXP_KEY, expiresAt);
      sessionStorage.setItem(TOKEN_KEY, token);
      if (expiresAt) sessionStorage.setItem(TOKEN_EXP_KEY, expiresAt);
      window.dispatchEvent(new CustomEvent('candleier:authChange', { detail: { authenticated: true } }));
    },

    clearSession: function () {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_EXP_KEY);
      sessionStorage.removeItem(CUST_CACHE_KEY);
      sessionStorage.removeItem(DEMO_MODE_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXP_KEY);
      localStorage.removeItem(CUST_CACHE_KEY);
      localStorage.removeItem(DEMO_MODE_KEY);
      window.dispatchEvent(new CustomEvent('candleier:authChange', { detail: { authenticated: false } }));
    },

    isAuthenticated: function () {
      const token = this.getToken();
      if (!token) return false;
      const exp = localStorage.getItem(TOKEN_EXP_KEY) || sessionStorage.getItem(TOKEN_EXP_KEY);
      if (exp && new Date(exp) < new Date()) {
        this.clearSession();
        return false;
      }
      return true;
    },

    // GraphQL request executor
    async graphqlRequest(query, variables = {}) {
      const cfg = this.getConfig();
      if (!this.isConfigured()) {
        throw new Error('Shopify Storefront credentials are not yet configured in CANDLEIER_CONFIG.');
      }
      const endpoint = `https://${cfg.storeDomain.replace(/\/$/, '')}/api/${cfg.apiVersion}/graphql.json`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': cfg.storefrontToken
        },
        body: JSON.stringify({ query, variables })
      });
      if (!response.ok) {
        throw new Error(`Shopify API error: HTTP ${response.status}`);
      }
      const json = await response.json();
      if (json.errors && json.errors.length) {
        throw new Error(json.errors.map(e => e.message).join(', '));
      }
      return json.data;
    },

    // 1. Customer Authentication (Login)
    async login(email, password, remember = false) {
      if (!email || !password) {
        throw new Error('Please enter both email address and password.');
      }

      if (this.isConfigured()) {
        const query = `
          mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          input: { email, password }
        });
        const result = data.customerAccessTokenCreate;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        if (!result.customerAccessToken) {
          throw new Error('Invalid email or password. Please verify your credentials.');
        }
        this.setSession(
          result.customerAccessToken.accessToken,
          result.customerAccessToken.expiresAt,
          remember
        );
        return await this.getCustomer();
      }

      // Preview / Dev mode fallback when live Storefront credentials are unconfigured:
      // Accepts sign in so the user can interactively test account/order features in AI Studio preview.
      const simulatedToken = 'c_tok_' + Math.random().toString(36).substring(2, 15);
      const simulatedExp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      localStorage.setItem(DEMO_MODE_KEY, 'true');
      sessionStorage.setItem(DEMO_MODE_KEY, 'true');
      this.setSession(simulatedToken, simulatedExp, true);

      // Cache demo profile in both storages with user-provided email
      const localPart = (email.split('@')[0] || 'Customer').replace(/[._-]/g, ' ');
      const cleanName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
      const profile = Object.assign({}, DEMO_CUSTOMER, {
        email: email,
        firstName: cleanName,
        displayName: cleanName
      });
      localStorage.setItem(CUST_CACHE_KEY, JSON.stringify(profile));
      sessionStorage.setItem(CUST_CACHE_KEY, JSON.stringify(profile));
      return profile;
    },

    // 2. Customer Registration (Sign up)
    async register({ firstName, lastName, email, phone, password }) {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters in length.');
      }

      if (this.isConfigured()) {
        const query = `
          mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                id
                email
                firstName
                lastName
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          input: { firstName, lastName, email, phone, password }
        });
        const result = data.customerCreate;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        // Immediately sign in to obtain token
        return await this.login(email, password, true);
      }

      // Preview fallback:
      const simulatedToken = 'c_tok_' + Math.random().toString(36).substring(2, 15);
      const simulatedExp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      localStorage.setItem(DEMO_MODE_KEY, 'true');
      sessionStorage.setItem(DEMO_MODE_KEY, 'true');
      this.setSession(simulatedToken, simulatedExp, true);

      const newCustomer = Object.assign({}, DEMO_CUSTOMER, {
        firstName: firstName || 'Client',
        lastName: lastName || '',
        displayName: `${firstName || ''} ${lastName || ''}`.trim() || 'Client',
        email: email,
        phone: phone || '',
        orders: []
      });
      localStorage.setItem(CUST_CACHE_KEY, JSON.stringify(newCustomer));
      sessionStorage.setItem(CUST_CACHE_KEY, JSON.stringify(newCustomer));
      return newCustomer;
    },

    // 3. Password Recovery (Forgot Password)
    async recoverPassword(email) {
      if (!email) throw new Error('Please provide your email address.');

      if (this.isConfigured()) {
        const query = `
          mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, { email });
        const result = data.customerRecover;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        return { success: true };
      }

      // Simulate network latency for authentic feel
      await new Promise(resolve => setTimeout(resolve, 600));
      return { success: true };
    },

    // 4. Customer Profile Fetch
    async getCustomer(forceRefresh = false) {
      if (!this.isAuthenticated()) {
        return null;
      }

      const cached = sessionStorage.getItem(CUST_CACHE_KEY) || localStorage.getItem(CUST_CACHE_KEY);
      if (cached && !forceRefresh) {
        try {
          const parsed = JSON.parse(cached);
          // Purge any stale legacy personal info from client storage
          if (parsed && (
            (parsed.email && parsed.email.toLowerCase().includes('rituraj')) ||
            (parsed.firstName && parsed.firstName.toLowerCase().includes('rituraj')) ||
            (parsed.lastName && parsed.lastName.toLowerCase().includes('singh')) ||
            (parsed.defaultAddress && parsed.defaultAddress.address1 && parsed.defaultAddress.address1.toLowerCase().includes('oberoi'))
          )) {
            sessionStorage.removeItem(CUST_CACHE_KEY);
            localStorage.removeItem(CUST_CACHE_KEY);
          } else {
            return parsed;
          }
        } catch (e) {
          // ignore corrupted cache
        }
      }

      if (this.isConfigured()) {
        const token = this.getToken();
        const query = `
          query getCustomer($token: String!) {
            customer(customerAccessToken: $token) {
              id
              firstName
              lastName
              displayName
              email
              phone
              createdAt
              defaultAddress {
                id
                firstName
                lastName
                address1
                address2
                city
                province
                zip
                country
                phone
              }
              addresses(first: 10) {
                edges {
                  node {
                    id
                    firstName
                    lastName
                    address1
                    address2
                    city
                    province
                    zip
                    country
                    phone
                  }
                }
              }
              orders(first: 15, sortKey: PROCESSED_AT, reverse: true) {
                edges {
                  node {
                    id
                    name
                    orderNumber
                    processedAt
                    financialStatus
                    fulfillmentStatus
                    currencyCode
                    totalPriceV2 {
                      amount
                      currencyCode
                    }
                    subtotalPriceV2 {
                      amount
                      currencyCode
                    }
                    totalTaxV2 {
                      amount
                      currencyCode
                    }
                    shippingAddress {
                      firstName
                      lastName
                      address1
                      address2
                      city
                      province
                      zip
                      country
                      phone
                    }
                    successfulFulfillments(first: 5) {
                      trackingCompany
                      trackingInfo(first: 5) {
                        number
                        url
                      }
                    }
                    lineItems(first: 20) {
                      edges {
                        node {
                          title
                          quantity
                          variant {
                            title
                            priceV2 {
                              amount
                            }
                            image {
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        try {
          const data = await this.graphqlRequest(query, { token });
          if (!data || !data.customer) {
            this.clearSession();
            return null;
          }

          const raw = data.customer;
          const formatted = {
            id: raw.id,
            firstName: raw.firstName || '',
            lastName: raw.lastName || '',
            displayName: raw.displayName || `${raw.firstName || ''} ${raw.lastName || ''}`.trim() || 'Client',
            email: raw.email,
            phone: raw.phone || '',
            createdAt: raw.createdAt,
            tier: 'Sanctuary Connoisseur',
            defaultAddress: raw.defaultAddress,
            addresses: (raw.addresses?.edges || []).map(e => e.node),
            orders: (raw.orders?.edges || []).map(e => {
              const o = e.node;
              const fulfillment = o.successfulFulfillments?.[0];
              const trackInfo = fulfillment?.trackingInfo?.[0];
              return {
                id: o.id,
                orderNumber: o.orderNumber ? `TC${o.orderNumber}` : o.name,
                name: o.name,
                processedAt: o.processedAt,
                financialStatus: o.financialStatus,
                fulfillmentStatus: o.fulfillmentStatus,
                currencyCode: o.currencyCode || 'INR',
                totalPrice: parseFloat(o.totalPriceV2?.amount || 0),
                subtotalPrice: parseFloat(o.subtotalPriceV2?.amount || 0),
                totalTax: parseFloat(o.totalTaxV2?.amount || 0),
                shippingAddress: o.shippingAddress,
                tracking: {
                  courier: fulfillment?.trackingCompany || 'Bluedart Express',
                  trackingNumber: trackInfo?.number || 'IN-TRANSIT',
                  trackingUrl: trackInfo?.url || '',
                  status: o.fulfillmentStatus === 'FULFILLED' ? 'Delivered' : 'In Transit'
                },
                lineItems: (o.lineItems?.edges || []).map(li => ({
                  title: li.node.title,
                  variantTitle: li.node.variant?.title || '',
                  quantity: li.node.quantity,
                  price: parseFloat(li.node.variant?.priceV2?.amount || 0),
                  image: li.node.variant?.image?.url || 'asset/one.jpg'
                }))
              };
            })
          };

          const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
          storage.setItem(CUST_CACHE_KEY, JSON.stringify(formatted));
          return formatted;
        } catch (err) {
          console.warn('[The Candleier] Could not fetch remote customer profile:', err);
          return null;
        }
      }

      // Preview mode data fallback
      const stored = localStorage.getItem(CUST_CACHE_KEY) || sessionStorage.getItem(CUST_CACHE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
      return DEMO_CUSTOMER;
    },

    // 5. Update Customer Profile
    async updateProfile(profileData) {
      if (!this.isAuthenticated()) throw new Error('Authentication required.');

      if (this.isConfigured()) {
        const token = this.getToken();
        const query = `
          mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
            customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
              customer {
                id
                firstName
                lastName
                email
                phone
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          customerAccessToken: token,
          customer: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phone: profileData.phone
          }
        });
        const result = data.customerUpdate;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        return await this.getCustomer(true);
      }

      // Preview fallback:
      const cust = await this.getCustomer();
      cust.firstName = profileData.firstName || cust.firstName;
      cust.lastName = profileData.lastName || cust.lastName;
      cust.displayName = `${cust.firstName} ${cust.lastName}`.trim();
      cust.phone = profileData.phone || cust.phone;
      const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
      storage.setItem(CUST_CACHE_KEY, JSON.stringify(cust));
      return cust;
    },

    // 6. Orders
    async getOrders() {
      const cust = await this.getCustomer();
      return cust?.orders || [];
    },

    async getOrder(orderIdOrNumber) {
      const orders = await this.getOrders();
      if (!orderIdOrNumber) return orders[0] || null;

      const cleanTarget = String(orderIdOrNumber).replace(/^#/, '').toLowerCase().trim();
      return orders.find(o => {
        const num = String(o.orderNumber || '').replace(/^#/, '').toLowerCase().trim();
        const name = String(o.name || '').replace(/^#/, '').toLowerCase().trim();
        const id = String(o.id || '').toLowerCase().trim();
        return num === cleanTarget || name === cleanTarget || id === cleanTarget;
      }) || null;
    },

    // 7. Tracking Lookup
    async trackShipment(identifier) {
      if (!identifier || !identifier.trim()) {
        throw new Error('Please enter an Order ID or Waybill Number.');
      }
      const queryClean = identifier.replace(/^#/, '').trim().toLowerCase();

      // Check external custom endpoint if configured
      const cfg = this.getConfig();
      if (cfg.trackingEndpoint) {
        try {
          const resp = await fetch(cfg.trackingEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: queryClean })
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data.found) return data;
          }
        } catch (e) {
          console.warn('External tracking endpoint failed, falling back to customer order registry:', e);
        }
      }

      // Check user's order registry
      const orders = await this.getOrders();
      const match = orders.find(o => {
        const orderNum = String(o.orderNumber || '').replace(/^#/, '').toLowerCase();
        const trackingNum = String(o.tracking?.trackingNumber || '').toLowerCase();
        return orderNum === queryClean || trackingNum === queryClean;
      });

      if (match && match.tracking) {
        return {
          found: true,
          orderNumber: match.orderNumber,
          orderId: match.id,
          date: match.processedAt,
          courier: match.tracking.courier,
          trackingNumber: match.tracking.trackingNumber,
          trackingUrl: match.tracking.trackingUrl,
          status: match.tracking.status,
          statusCode: match.tracking.statusCode,
          estimatedDelivery: match.tracking.estimatedDelivery,
          destination: match.tracking.destination || 'India',
          timeline: match.tracking.timeline || [],
          items: match.lineItems
        };
      }

      // Generic order number recognition (e.g. TC10234 demo check)
      if (queryClean === 'tc10234' || queryClean === '10234' || queryClean.includes('9842105')) {
        return {
          found: true,
          orderNumber: '#TC10234',
          courier: 'Bluedart Express',
          trackingNumber: 'BLUEDART-9842105',
          trackingUrl: 'https://www.bluedart.com',
          status: 'Out for Delivery',
          statusCode: 'out_for_delivery',
          estimatedDelivery: '18 September 2026',
          destination: 'Gurugram, Haryana',
          items: DEMO_CUSTOMER.orders[0].lineItems,
          timeline: DEMO_CUSTOMER.orders[0].tracking.timeline
        };
      }

      return { found: false };
    },

    // 8. Saved Addresses
    async getAddresses() {
      const cust = await this.getCustomer();
      return cust?.addresses || [];
    },

    async addAddress(addressData) {
      if (!this.isAuthenticated()) throw new Error('Authentication required.');

      if (this.isConfigured()) {
        const token = this.getToken();
        const query = `
          mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
            customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
              customerAddress {
                id
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          customerAccessToken: token,
          address: {
            firstName: addressData.firstName,
            lastName: addressData.lastName,
            address1: addressData.address1,
            address2: addressData.address2 || '',
            city: addressData.city,
            province: addressData.province,
            zip: addressData.zip,
            country: addressData.country || 'India',
            phone: addressData.phone
          }
        });
        const result = data.customerAddressCreate;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        return await this.getCustomer(true);
      }

      // Preview fallback
      const cust = await this.getCustomer();
      const newAddr = {
        id: 'addr_' + Date.now(),
        firstName: addressData.firstName,
        lastName: addressData.lastName || '',
        address1: addressData.address1,
        address2: addressData.address2 || '',
        city: addressData.city,
        province: addressData.province,
        zip: addressData.zip,
        country: addressData.country || 'India',
        phone: addressData.phone,
        tag: addressData.tag || 'HOME',
        isDefault: Boolean(addressData.isDefault)
      };

      if (!cust.addresses) cust.addresses = [];
      if (newAddr.isDefault) {
        cust.addresses.forEach(a => { a.isDefault = false; });
        cust.defaultAddress = newAddr;
      }
      cust.addresses.push(newAddr);
      const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
      storage.setItem(CUST_CACHE_KEY, JSON.stringify(cust));
      return cust;
    },

    async updateAddress(addressId, addressData) {
      if (!this.isAuthenticated()) throw new Error('Authentication required.');

      if (this.isConfigured()) {
        const token = this.getToken();
        const query = `
          mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
            customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
              customerAddress {
                id
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          customerAccessToken: token,
          id: addressId,
          address: addressData
        });
        const result = data.customerAddressUpdate;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        return await this.getCustomer(true);
      }

      // Preview fallback
      const cust = await this.getCustomer();
      const idx = (cust.addresses || []).findIndex(a => a.id === addressId);
      if (idx !== -1) {
        Object.assign(cust.addresses[idx], addressData);
        if (addressData.isDefault) {
          cust.addresses.forEach((a, i) => { a.isDefault = (i === idx); });
          cust.defaultAddress = cust.addresses[idx];
        }
      }
      const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
      storage.setItem(CUST_CACHE_KEY, JSON.stringify(cust));
      return cust;
    },

    async deleteAddress(addressId) {
      if (!this.isAuthenticated()) throw new Error('Authentication required.');

      if (this.isConfigured()) {
        const token = this.getToken();
        const query = `
          mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
            customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
              deletedCustomerAddressId
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          id: addressId,
          customerAccessToken: token
        });
        const result = data.customerAddressDelete;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        return await this.getCustomer(true);
      }

      // Preview fallback
      const cust = await this.getCustomer();
      cust.addresses = (cust.addresses || []).filter(a => a.id !== addressId);
      if (cust.defaultAddress?.id === addressId) {
        cust.defaultAddress = cust.addresses[0] || null;
        if (cust.defaultAddress) cust.defaultAddress.isDefault = true;
      }
      const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
      storage.setItem(CUST_CACHE_KEY, JSON.stringify(cust));
      return cust;
    },

    async setDefaultAddress(addressId) {
      if (!this.isAuthenticated()) throw new Error('Authentication required.');

      if (this.isConfigured()) {
        const token = this.getToken();
        const query = `
          mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
            customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
              customer {
                id
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `;
        const data = await this.graphqlRequest(query, {
          customerAccessToken: token,
          addressId: addressId
        });
        const result = data.customerDefaultAddressUpdate;
        if (result.customerUserErrors && result.customerUserErrors.length) {
          throw new Error(result.customerUserErrors[0].message);
        }
        return await this.getCustomer(true);
      }

      // Preview fallback
      const cust = await this.getCustomer();
      (cust.addresses || []).forEach(a => {
        a.isDefault = (a.id === addressId);
        if (a.isDefault) cust.defaultAddress = a;
      });
      const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
      storage.setItem(CUST_CACHE_KEY, JSON.stringify(cust));
      return cust;
    },

    // 9. Logout
    async logout() {
      if (this.isConfigured() && this.isAuthenticated()) {
        try {
          const token = this.getToken();
          const query = `
            mutation customerAccessTokenDelete($customerAccessToken: String!) {
              customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
                deletedAccessToken
                userErrors {
                  field
                  message
                }
              }
            }
          `;
          await this.graphqlRequest(query, { customerAccessToken: token });
        } catch (e) {
          console.warn('Logout notification to Shopify failed (session will be cleared locally):', e);
        }
      }
      this.clearSession();
      window.location.href = 'login.html';
    },

    // 10. Route Protection Guard
    async requireAuth(intendedRedirect) {
      if (!this.isAuthenticated()) {
        const redirectParam = intendedRedirect ? `?redirect=${encodeURIComponent(intendedRedirect)}` : '';
        window.location.href = `login.html${redirectParam}`;
        return null;
      }
      const customer = await this.getCustomer();
      if (!customer) {
        window.location.href = `login.html`;
        return null;
      }
      return customer;
    },

    // 11. Header & Navigation Sync across all pages
    syncHeaderAuth: function () {
      const isAuth = this.isAuthenticated();
      const accountBtns = document.querySelectorAll('.action-btn[href="login.html"], .action-btn[href="account.html"], #accountHeaderBtn');
      const mobileAccountLinks = document.querySelectorAll('.mobile-nav-link[href="login.html"], .mobile-nav-link[href="account.html"]');

      if (isAuth) {
        accountBtns.forEach(btn => {
          btn.setAttribute('href', 'account.html');
          btn.setAttribute('title', 'My Account');
          btn.setAttribute('aria-label', 'My Account');
          btn.classList.add('authenticated');
        });

        mobileAccountLinks.forEach(link => {
          link.setAttribute('href', 'account.html');
          const span = link.querySelector('span:first-child');
          if (span) span.textContent = 'My Account';
        });

        // Add mobile drawer extra account shortcuts if not present
        const mobileList = document.querySelector('.mobile-nav-list');
        if (mobileList && !document.getElementById('mobAccountGroup')) {
          const group = document.createElement('li');
          group.id = 'mobAccountGroup';
          group.className = 'mob-account-group';
          group.innerHTML = `
            <div class="mob-account-sublinks">
              <a href="orders.html" class="mob-sub-link">My Orders</a>
              <a href="tracking.html" class="mob-sub-link">Track Parcel</a>
              <a href="addresses.html" class="mob-sub-link">Saved Addresses</a>
              <a href="edit-profile.html" class="mob-sub-link">Personal Info</a>
              <button type="button" class="mob-sub-link mob-logout-btn" onclick="ShopifyService.logout()">Sign Out</button>
            </div>
          `;
          mobileList.appendChild(group);
        }
      } else {
        accountBtns.forEach(btn => {
          btn.setAttribute('href', 'login.html');
          btn.setAttribute('title', 'Sign In');
          btn.setAttribute('aria-label', 'Client Sign In');
          btn.classList.remove('authenticated');
        });

        mobileAccountLinks.forEach(link => {
          link.setAttribute('href', 'login.html');
          const span = link.querySelector('span:first-child');
          if (span) span.textContent = 'Client Sign In';
        });

        const mobGroup = document.getElementById('mobAccountGroup');
        if (mobGroup) mobGroup.remove();
      }
    }
  };

  // Expose globally
  window.ShopifyService = ShopifyService;

  // Auto-sync immediately, on DOM ready, and on auth changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ShopifyService.syncHeaderAuth();
    });
  } else {
    ShopifyService.syncHeaderAuth();
  }

  window.addEventListener('candleier:authChange', () => {
    ShopifyService.syncHeaderAuth();
  });

})(window);
