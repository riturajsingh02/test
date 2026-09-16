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
