import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { randomNumber, formatDate } from './utils.js';

const form = document.getElementById('checkoutForm');
const statusMsg = document.getElementById('statusMsg');

let uid, cartData, charges;

onAuthStateChanged(auth, async user => {
    if (!user) return;
    uid = user.uid;
    const cartSnap = await getDoc(doc(db, 'carts', uid));
    cartData = cartSnap.data().items || [];
    charges = {
        ...randomNumber(10, 50),
        timestamp: Date.now()
    };
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    const address = form.address.value;

    statusMsg.textContent = "Your food is being prepared...";
    await delay(1000);
    statusMsg.textContent = "Order dispatched!";
    await delay(1000);
    statusMsg.textContent = "Your order has been successfully delivered!";
    await delay(5000);

    const order = {
        items: cartData,
        address,
        charges: charges,
        timestamp: Date.now()
    };

    await updateDoc(doc(db, 'orders', uid), {
        orders: arrayUnion(order)
    });

    await setDoc(doc(db, 'carts', uid), { items: [] });
    window.location.href = 'orders.html';
});

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
