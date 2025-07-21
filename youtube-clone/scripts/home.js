import { auth } from './firebase.js';
import { throttle } from './utils.js';

let nextPageToken = "";
const apiKey = "YOUR_YOUTUBE_API_KEY";
const container = document.getElementById("videoContainer");

async function fetchVideos() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=9&pageToken=${nextPageToken}&regionCode=IN&key=${apiKey}`
    );
    const data = await res.json();
    nextPageToken = data.nextPageToken;
    renderVideos(data.items);
}

function renderVideos(videos) {
    videos.forEach((video) => {
        const div = document.createElement("div");
        div.className = "bg-white rounded shadow p-2";
        div.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" class="w-full rounded">
      <h3 class="text-md font-bold mt-2">${video.snippet.title}</h3>
      <p class="text-sm text-gray-600">${video.snippet.channelTitle}</p>
    `;
        div.addEventListener("click", () => {
            localStorage.setItem("videoId", video.id);
            location.href = "video.html";
        });
        container.appendChild(div);
    });
}

window.addEventListener("scroll", throttle(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchVideos();
    }
}, 300));

fetchVideos();
