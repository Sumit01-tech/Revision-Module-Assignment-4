import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { randomNumber } from './utils.js';

const cartItemsEl = document.getElementById('cartItems');
const chargesEl = document.getElementById('charges');
const checkoutBtn = document.getElementById('checkoutBtn');

let uid, cartData, deliveryCharge;

onAuthStateChanged(auth, async user => {
    if (!user) return;
    uid = user.uid;
    await loadCart();
});

async function loadCart() {
    const cartRef = doc(db, 'carts', uid);
    const cartSnap = await getDoc(cartRef);
    cartData = cartSnap.data().items || [];
    renderCart();
}

function calcCharges() {
    const subtotal = cartData.reduce((a, c) => a + c.price * c.quantity, 0);
    const gst = subtotal * 0.18;
    const platform = 10;
    const donation = 1;
    deliveryCharge = randomNumber(10, 50);
    const grand = subtotal + gst + platform + donation + deliveryCharge;
    return { subtotal, gst, platform, donation, deliveryCharge, grand };
}

function renderCart() {
    cartItemsEl.innerHTML = '';
    cartData.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
      <span>${item.name} (₹${item.price} x ${item.quantity})</span>
      <button data-index="${i}" class="removeBtn">Remove</button>
    `;
        cartItemsEl.appendChild(div);
    });

    const ch = calcCharges();
    chargesEl.innerHTML = `
    Subtotal: ₹${ch.subtotal.toFixed(2)}<br>
    GST (18%): ₹${ch.gst.toFixed(2)}<br>
    Platform Fee: ₹${ch.platform}<br>
    Donation: ₹${ch.donation}<br>
    Delivery Charge: ₹${ch.deliveryCharge}<br>
    <strong>Grand Total: ₹${ch.grand.toFixed(2)}</strong>
  `;

    document.querySelectorAll('.removeBtn').forEach(btn => {
        btn.onclick = () => removeItem(btn.dataset.index);
    });
}

async function removeItem(i) {
    cartData.splice(i, 1);
    await setDoc(doc(db, 'carts', uid), { items: cartData });
    renderCart();
}

checkoutBtn.onclick = () => window.location.href = 'checkout.html';
