import { auth, db } from './firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');

if (signupForm) signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = signupForm.email.value, pwd = signupForm.password.value;
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, pwd);
        await setDoc(doc(db, 'carts', userCred.user.uid), { items: [] });
        window.location.href = 'index.html';
    } catch (err) { alert(err.message); }
});

if (loginForm) loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = loginForm.email.value, pwd = loginForm.password.value;
    try {
        await signInWithEmailAndPassword(auth, email, pwd);
        window.location.href = 'index.html';
    } catch (err) { alert(err.message); }
});

if (logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, user => {
    const pages = ['index.html', 'cart.html', 'checkout.html', 'orders.html'];
    const path = location.pathname.split('/').pop();
    if (!user && pages.includes(path)) location.href = 'login.html';
    if (user && ['login.html', 'signup.html'].includes(path)) location.href = 'index.html';
});
