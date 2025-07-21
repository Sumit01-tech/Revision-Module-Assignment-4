import { auth, db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { formatDate } from './utils.js';

const ordersListEl = document.getElementById('ordersList');

onAuthStateChanged(auth, async user => {
    if (!user) return;
    const ordersSnap = await getDoc(doc(db, 'orders', user.uid));
    const orders = ordersSnap.data()?.orders || [];
    renderOrders(orders);
});

function renderOrders(orders) {
    ordersListEl.innerHTML = '';
    if (orders.length === 0) {
        ordersListEl.textContent = 'No past orders yet.';
        return;
    }

    orders.forEach(order => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
      <h3>Ordered at: ${formatDate(order.timestamp)}</h3>
      <p>Address: ${order.address}</p>
      <ul>
        ${order.items.map(i => `<li>${i.name} - ₹${i.price} x ${i.quantity}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> ₹${order.charges.grand.toFixed(2)}</p>
    `;
        ordersListEl.appendChild(div);
    });
}
