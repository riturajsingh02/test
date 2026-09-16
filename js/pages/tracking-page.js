function trackOrderPage() {
  const val = document.getElementById('orderIdInput')?.value.trim();
  const res = document.getElementById('trackingResult');
  if (!res) return;
  if (val && val.length > 3) {
    res.style.display = 'block';
  } else {
    alert('Please enter a valid Order ID or Mobile Number.');
  }
}
window.trackOrder = trackOrderPage;
