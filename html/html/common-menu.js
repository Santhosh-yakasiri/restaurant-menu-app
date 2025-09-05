// Common interactive menu script for all menu pages
function changeQty(btn, delta) {
  var imgBox = btn.closest('.img-box');
  var badge = imgBox.querySelector('.qty-badge');
  var qty = parseInt(badge.textContent) + delta;
  if (qty < 0) qty = 0;
  badge.textContent = qty;
  if (qty > 0) {
    imgBox.classList.add('has-qty');
  } else {
    imgBox.classList.remove('has-qty');
  }
  updateOrderBtn();
}

function updateOrderBtn() {
  // Show Place Order button if any qty > 0
  var show = false;
  document.querySelectorAll('.qty-badge').forEach(function(badge) {
    if (parseInt(badge.textContent) > 0) show = true;
  });
  var btn = document.getElementById('place-order-btn');
  if (btn) btn.className = show ? 'show' : '';
}

function showOrderModal() {
  var items = document.querySelectorAll('td');
  var summary = [];
  items.forEach(function(td) {
    var name = td.querySelector('h3')?.innerText;
    var price = td.querySelector('p')?.innerText.match(/\d+/)?.[0];
    var qty = td.querySelector('.qty-badge')?.textContent;
    if (name && price && qty && parseInt(qty) > 0) {
      summary.push({ name, price, qty });
    }
  });
  var list = document.getElementById('order-summary-list');
  if (!list) return;
  list.innerHTML = '';
  var total = 0;
  summary.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item.name + ' x ' + item.qty + ' = ₹' + (parseInt(item.price)*parseInt(item.qty));
    total += parseInt(item.price)*parseInt(item.qty);
    list.appendChild(li);
  });
  var totalDiv = document.getElementById('order-total');
  if (totalDiv) totalDiv.textContent = 'Total: ₹' + total;
  var modal = document.getElementById('order-modal');
  if (modal) modal.style.display = 'flex';
}
function closeOrderModal() {
  var modal = document.getElementById('order-modal');
  if (modal) modal.style.display = 'none';
}
function confirmOrder() {
  alert('Order placed! Thank you.');
  closeOrderModal();
  // Reset all quantities
  document.querySelectorAll('.qty-badge').forEach(function(badge) {
    badge.textContent = 0;
    badge.closest('.img-box').classList.remove('has-qty');
  });
  updateOrderBtn();
}
