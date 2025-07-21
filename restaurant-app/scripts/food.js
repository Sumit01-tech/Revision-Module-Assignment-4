import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const foodList = [
    { id: 'f1', name: 'Pizza', price: 250, img: 'assets/images/pizza.jpg' },
    { id: 'f2', name: 'Burger', price: 150, img: 'assets/images/burger.jpg' },
    { id: 'f3', name: 'Pasta', price: 200, img: 'assets/images/pasta.jpg' }
];

const menuEl = document.getElementById('foodList');
const cartCountEl = document.getElementById('cartCount');

async function loadCartCount(uid) {
    const cartRef = doc(db, 'carts', uid);
    const cartSnap = await getDoc(cartRef);
    const count = (cartSnap.data()?.items?.length) || 0;
    cartCountEl.textContent = count;
}

onAuthStateChanged(auth, user => {
    if (!user) return;
    loadCartCount(user.uid);
    renderMenu(user.uid);
});

function renderMenu(uid) {
    menuEl.innerHTML = '';
    foodList.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button class="button">Add to Cart</button>
    `;
        div.querySelector('button').onclick = () => addToCart(uid, item);
        menuEl.appendChild(div);
    });
}

async function addToCart(uid, item) {
    const cartRef = doc(db, 'carts', uid);
    await updateDoc(cartRef, { items: arrayUnion({ ...item, quantity: 1 }) });
    loadCartCount(uid);
}
