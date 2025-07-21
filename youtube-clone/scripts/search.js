import { debounce } from "./utils.js";

const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with actual API Key or import from config.js
const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");

// Debounced search handler
searchInput.addEventListener("input", debounce(handleSearch, 500));

function handleSearch(e) {
    const query = e.target.value.trim();
    if (!query) {
        searchResultsContainer.innerHTML = "";
        return;
    }
    fetchSearchResults(query);
}

async function fetchSearchResults(query) {
    try {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        renderSearchResults(data.items);
    } catch (err) {
        console.error("Search fetch error:", err);
    }
}

function renderSearchResults(videos) {
    searchResultsContainer.innerHTML = "";
    videos.forEach((video) => {
        const div = document.createElement("div");
        div.classList.add("video-item");
        div.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" alt="thumbnail" />
      <div>
        <h3>${video.snippet.title}</h3>
        <p>${video.snippet.channelTitle}</p>
      </div>
    `;
        div.addEventListener("click", () => {
            localStorage.setItem("selectedVideoId", video.id.videoId);
            window.location.href = "video.html";
        });
        searchResultsContainer.appendChild(div);
    });
}
