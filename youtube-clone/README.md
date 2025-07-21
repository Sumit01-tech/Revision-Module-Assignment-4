# 🎬 YouTube Clone - Frontend Project

A fully responsive clone of the YouTube UI built using **HTML, CSS, and Vanilla JavaScript**, with Firebase Authentication and YouTube Data API v3 integration.

---

## 🚀 Live Demo
🔗 [Deployed Link](https://your-deployment-url.vercel.app)

---

## 📁 Folder Structure

```
youtube-clone/
├── index.html                # Home page (Video feed)
├── video.html               # Video detail page
├── login.html               # Login page
├── signup.html              # Signup page
├── styles/
│   └── style.css            # Custom styling
├── scripts/
│   ├── auth.js              # Firebase login/signup/logout logic
│   ├── home.js              # Home page video fetching & rendering
│   ├── search.js            # Search suggestions + debounce
│   ├── video.js             # Single video detail + related videos
│   ├── utils.js             # Debounce, throttle, helper functions
│   └── firebase.js          # Firebase config
├── assets/                  # Logos, icons, loaders
├── .env                     # API key for YouTube Data API
└── README.md
```

---

## 🛠️ Features

- ✅ Responsive YouTube-like UI
- 🔍 Search functionality with **debounced suggestions**
- 📹 View trending/search results using YouTube Data API
- 🔁 Infinite scroll using **throttling**
- 🔐 Firebase Authentication (Login/Signup)
- 🎬 Video detail page with YouTube iframe embed
- 🚫 Protected routes (only logged-in users can access content)

---

## 🔧 Technologies Used

- HTML5, CSS3 (Tailwind/Bootstrap optional)
- JavaScript (Vanilla)
- Firebase (Authentication)
- YouTube Data API v3
- Netlify / Vercel for deployment

---

## 🔐 Authentication Flow

1. User lands on `login.html` or `signup.html`
2. On successful login/signup (via Firebase), user is redirected to `index.html`
3. All protected pages verify Firebase user state
4. If not authenticated, user is redirected to login

---

## 🔎 API Usage

### 🔗 YouTube Data API v3

- **Search Suggestions:**  
  `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q={query}`

- **Search Results:**  
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&key=API_KEY`

- **Video Details:**  
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={videoId}&key=API_KEY`

---

## 🧪 How to Run Locally

### Prerequisites
- Node.js (optional, only for local server if needed)
- API key from [YouTube Data API v3](https://console.developers.google.com/)
- Firebase Project

### Steps

```bash
git clone https://github.com/Sumit01-tech/Revision-Module-Assignment-4.git
cd youtube-clone

# Add your YouTube API key
echo "YOUTUBE_API_KEY=YOUR_API_KEY" > .env

```

---

## 📸 Screenshots

| Home Page | Search Results | Video Page | Login | Signup |
|-----------|----------------|------------|--------|--------|
| ![home](assets/screens/home.png) | ![search](assets/screens/search.png) | ![video](assets/screens/video.png) | ![login](assets/screens/login.png) | ![signup](assets/screens/signup.png) |

---

## 🎁 Bonus Features (Optional)
- 🌙 Dark / Light Mode toggle
- 📜 Watch History using localStorage
- 📺 Related Videos on video page

---

## 📚 License

This project is open-source and free to use.

---

**Made with ❤️ by Sumit Gourav**
