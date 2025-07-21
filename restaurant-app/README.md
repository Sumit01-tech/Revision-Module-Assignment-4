# 🍽️ Online Restaurant Ordering App

A fully functional restaurant web application built with **HTML, CSS, Vanilla JavaScript**, and **Firebase**. Users can sign up, browse food items, add them to cart, checkout, and view their order history.

---

## 🚀 Live Demo

🔗 [Deployed Link](https://your-deployment-url.netlify.app)

---

## 🧩 Features Implemented

### 🔐 Firebase Authentication
- User Signup & Login (email & password)
- Only logged-in users can:
  - Add to Cart
  - View Cart
  - Checkout
  - View Order History

### 🍱 Food Listing Page
- Dynamic list of food items with image, name, and price
- "Add to Cart" button for each item
- Navbar shows total items in cart (live count)
- Responsive grid for food display

### 🛒 Cart Page
- Display:
  - Food Name, Quantity, Price per item
- Charges calculated:
  - Subtotal
  - GST (18%)
  - Platform Fee (₹10)
  - Donation (₹1)
  - Delivery Charge (₹10–₹50 random)
  - **Grand Total**
- Quantity can be updated and items removed ✅

### 💳 Checkout Page
- Address input form
- Order flow messages:
  - “Your food is being prepared…”
  - “Order dispatched…”
  - “Delivered!”
- Order saved to Firebase with:
  - Address
  - Cart items
  - Charges breakdown
  - Timestamp

### 📜 Order History Page
- Shows all previous orders by logged-in user
- Details include:
  - Ordered items
  - Delivery address
  - Grand total
  - Timestamp

---

## 🖼️ Screenshots

| Page | Screenshot |
|------|------------|
| Signup/Login | ![](assets/screens/login.png) |
| Food Listing | ![](assets/screens/food-list.png) |
| Cart | ![](assets/screens/cart.png) |
| Checkout | ![](assets/screens/checkout.png) |
| Order History | ![](assets/screens/orders.png) |

---

## 📁 Folder Structure

```
restaurant-app/
├── index.html                # Home - Food listing
├── login.html                # User login
├── signup.html               # User registration
├── cart.html                 # Cart page
├── checkout.html             # Checkout process
├── orders.html               # Order history
├── styles/
│   └── style.css             # Global and responsive styling
├── scripts/
│   ├── auth.js               # Login, signup, logout logic
│   ├── firebase.js           # Firebase configuration
│   ├── food.js               # Rendering food list, add to cart
│   ├── cart.js               # Cart display & logic
│   ├── checkout.js           # Checkout flow
│   ├── orders.js             # Order history display
│   └── utils.js              # Utility functions (randomizer, calc)
├── assets/
│   └── images/               # Food images & icons
├── .env                      # Firebase keys (optional)
└── README.md
```

---

## 🧰 Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Firebase:
  - Authentication
  - Firestore (or Realtime Database)
- Responsive Web Design (Media Queries)
- Optional: TailwindCSS or Bootstrap

---

## 🔐 Firebase Setup Summary

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Email/Password Authentication**
4. Create a Firestore/Realtime Database
5. Copy your Firebase config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

6. Paste it into `firebase.js` or load from `.env` securely

---

## 💻 How to Run Locally

```bash
git clone https://github.com/Sumit01-tech/Revision-Module-Assignment-4.git
cd restaurant-ordering-app

```

> ✅ Ensure Firebase config is added correctly in `firebase.js`

---

## 🌙 Bonus Features (Optional Implemented)

- 🔄 Update/remove item from cart
- 🧃 Food categories (Chinese, Italian, etc.)
- 🌓 Dark / Light theme toggle

---

## 🧪 Functional Requirements Checked

- [x] Firebase Authentication with email/password
- [x] User-specific cart and order history
- [x] Cart persists on page reload
- [x] Responsive UI
- [x] Firebase Firestore or Realtime DB integration

---

## 📚 License

This project is open-source and free to use for educational purposes.

---

**Made with ❤️ by Sumit Gourav**
