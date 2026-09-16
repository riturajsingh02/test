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
