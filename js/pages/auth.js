function handleLogin(e) {
  e.preventDefault();
  alert('Sign-in successful! Welcome back to The Candleier.');
  window.location.href = 'index.html';
}
function handleSignup(e) {
  e.preventDefault();
  alert('Account created successfully! Welcome to The Candleier community.');
  window.location.href = 'index.html';
}
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;

// Header counters and mobile drawer
document.addEventListener('DOMContentLoaded', () => {
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

