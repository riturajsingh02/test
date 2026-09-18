/* =========================================================
   THE CANDLEIER — AUTHENTICATION & FORM LOGIC
   Handles Login, Signup, Password Recovery, and Password Toggles
   Powered by ShopifyService
   ========================================================= */

(function () {
  'use strict';

  // Helper to read query parameter
  function getRedirectParam(defaultUrl = 'account.html') {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect && !redirect.startsWith('http') && !redirect.startsWith('//')) {
      return redirect;
    }
    return defaultUrl;
  }

  // Show / Hide password toggler
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.password-input-wrap')?.querySelector('input');
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        
        // Update SVG icon
        btn.innerHTML = isPassword ? `
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        ` : `
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      });
    });
  }

  // Clear banner / errors
  function clearErrors(form) {
    const banner = form.querySelector('.auth-alert-banner');
    if (banner) banner.remove();
    form.querySelectorAll('.input-error-msg').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  }

  function showErrorBanner(form, message) {
    clearErrors(form);
    const banner = document.createElement('div');
    banner.className = 'auth-alert-banner alert-error';
    banner.setAttribute('role', 'alert');
    banner.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0; margin-top:2px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    form.prepend(banner);
  }

  function showSuccessBanner(form, message) {
    clearErrors(form);
    const banner = document.createElement('div');
    banner.className = 'auth-alert-banner alert-success';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0; margin-top:2px;">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    form.prepend(banner);
  }

  function setInlineError(input, message) {
    input.classList.add('input-error');
    const existing = input.parentElement.querySelector('.input-error-msg');
    if (existing) existing.remove();
    const span = document.createElement('span');
    span.className = 'input-error-msg';
    span.textContent = message;
    input.parentElement.appendChild(span);
  }

  // 1. Handle Login
  async function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const form = document.getElementById('loginForm');
    if (!form) return;

    clearErrors(form);

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberCheckbox = document.getElementById('loginRemember');
    const submitBtn = form.querySelector('button[type="submit"]');

    const email = (emailInput?.value || '').trim();
    const password = passwordInput?.value || '';
    const remember = Boolean(rememberCheckbox?.checked);

    let hasError = false;
    if (!email) {
      setInlineError(emailInput, 'Email address is required.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInlineError(emailInput, 'Please enter a valid email address.');
      hasError = true;
    }

    if (!password) {
      setInlineError(passwordInput, 'Password is required.');
      hasError = true;
    }

    if (hasError) return;

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Sign In';
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Signing In...';
    }

    try {
      if (!window.ShopifyService) {
        throw new Error('Shopify service layer is unavailable. Please refresh.');
      }

      await window.ShopifyService.login(email, password, remember);

      if (submitBtn) {
        submitBtn.innerHTML = '✦ Authenticated';
      }

      // Check if redirect specified
      const redirectTarget = getRedirectParam('account.html');
      setTimeout(() => {
        window.location.replace(redirectTarget);
      }, 250);
    } catch (err) {
      showErrorBanner(form, err.message || 'Unable to sign in. Please verify your email and password.');
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  // 2. Handle Registration (Signup)
  async function handleSignup(e) {
    if (e && e.preventDefault) e.preventDefault();
    const form = document.getElementById('signupForm');
    if (!form) return;

    clearErrors(form);

    const firstNameInput = document.getElementById('signupFirstName');
    const lastNameInput = document.getElementById('signupLastName');
    const emailInput = document.getElementById('signupEmail');
    const phoneInput = document.getElementById('signupPhone');
    const passwordInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('signupConfirmPassword');
    const submitBtn = form.querySelector('button[type="submit"]');

    const firstName = (firstNameInput?.value || '').trim();
    const lastName = (lastNameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim();
    const password = passwordInput?.value || '';
    const confirmPassword = confirmInput?.value || '';

    let hasError = false;
    if (!firstName) {
      setInlineError(firstNameInput, 'First name is required.');
      hasError = true;
    }

    if (!email) {
      setInlineError(emailInput, 'Email address is required.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInlineError(emailInput, 'Please enter a valid email address.');
      hasError = true;
    }

    if (phone && !/^[0-9+-\s()]{8,15}$/.test(phone)) {
      setInlineError(phoneInput, 'Please enter a valid contact phone number.');
      hasError = true;
    }

    if (!password) {
      setInlineError(passwordInput, 'Password is required.');
      hasError = true;
    } else if (password.length < 8) {
      setInlineError(passwordInput, 'Password must be at least 8 characters.');
      hasError = true;
    }

    if (confirmInput && password !== confirmPassword) {
      setInlineError(confirmInput, 'Passwords do not match.');
      hasError = true;
    }

    if (hasError) return;

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Create Account';
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Creating Account...';
    }

    try {
      if (!window.ShopifyService) {
        throw new Error('Shopify service layer is unavailable.');
      }

      await window.ShopifyService.register({
        firstName,
        lastName,
        email,
        phone,
        password
      });

      showSuccessBanner(form, 'Account created successfully! Redirecting to your account sanctuary...');
      if (submitBtn) {
        submitBtn.innerHTML = '✦ Welcome';
      }

      const redirectTarget = getRedirectParam('account.html');
      setTimeout(() => {
        window.location.href = redirectTarget;
      }, 700);
    } catch (err) {
      showErrorBanner(form, err.message || 'Could not create account. Please check your details.');
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  // 3. Handle Forgot Password
  async function handleForgotPassword(e) {
    if (e && e.preventDefault) e.preventDefault();
    const form = document.getElementById('forgotPasswordForm');
    if (!form) return;

    clearErrors(form);

    const emailInput = document.getElementById('resetEmail');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = (emailInput?.value || '').trim();

    if (!email) {
      setInlineError(emailInput, 'Please enter your registered email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInlineError(emailInput, 'Please enter a valid email address.');
      return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Reset Instructions';
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Instructions...';
    }

    try {
      if (!window.ShopifyService) throw new Error('Service unavailable.');
      await window.ShopifyService.recoverPassword(email);

      showSuccessBanner(
        form,
        `Password reset instructions have been dispatched to <strong>${email}</strong>. Please check your inbox and spam folder.`
      );

      if (emailInput) emailInput.value = '';
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Instructions Sent ✓';
      }
    } catch (err) {
      showErrorBanner(form, err.message || 'Unable to process reset request. Please try again.');
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  // Expose globally
  window.handleLogin = handleLogin;
  window.handleSignup = handleSignup;
  window.handleForgotPassword = handleForgotPassword;

  // DOM initialization
  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();

    // Attach listeners
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    document.getElementById('forgotPasswordForm')?.addEventListener('submit', handleForgotPassword);

    // If user is already authenticated on login or signup, redirect immediately to account dashboard
    if (window.ShopifyService && window.ShopifyService.isAuthenticated()) {
      const isAuthPage = window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('signup.html');
      if (isAuthPage) {
        const redirectParam = getRedirectParam('account.html');
        window.location.replace(redirectParam);
        return;
      }
    }

    // Header counters and mobile drawer synchronization
    try {
      const savedCart = JSON.parse(localStorage.getItem('thecandleier_cart') || '[]');
      const count = savedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      const cartBadge = document.getElementById('cartCount');
      if (cartBadge) cartBadge.textContent = count;

      const savedWish = JSON.parse(localStorage.getItem('thecandleier_wishlist') || '[]');
      const wishBadge = document.getElementById('wishlistCount');
      if (wishBadge) wishBadge.textContent = savedWish.length;
    } catch (e) {}

    const mobDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
      mobDrawer?.classList.add('active');
      drawerOverlay?.classList.add('active');
    });
    document.getElementById('closeMobileNavBtn')?.addEventListener('click', () => {
      mobDrawer?.classList.remove('active');
      drawerOverlay?.classList.remove('active');
    });
    drawerOverlay?.addEventListener('click', () => {
      mobDrawer?.classList.remove('active');
      drawerOverlay?.classList.remove('active');
    });
  });
})();
