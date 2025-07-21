import { auth } from './firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutBtn = document.getElementById("logoutBtn");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html";
        } catch (err) {
            alert(err.message);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html";
        } catch (err) {
            alert(err.message);
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => signOut(auth));
}

onAuthStateChanged(auth, (user) => {
    const protectedPages = ["index.html", "video.html"];
    if (!user && protectedPages.includes(location.pathname.split("/").pop())) {
        location.href = "login.html";
    }
});
