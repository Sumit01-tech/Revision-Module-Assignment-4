const videoId = localStorage.getItem("videoId");
const apiKey = "YOUR_YOUTUBE_API_KEY";

async function loadVideo() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
    );
    const data = await res.json();
    const video = data.items[0];

    document.getElementById("videoFrame").innerHTML = `
    <iframe width="100%" height="400"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0" allowfullscreen></iframe>
  `;

    document.getElementById("videoDetails").innerHTML = `
    <h2 class="text-xl font-bold">${video.snippet.title}</h2>
    <p>${video.snippet.channelTitle} • ${video.statistics.viewCount} views</p>
    <p class="mt-2">${video.snippet.description}</p>
  `;

    loadRelatedVideos(videoId);
}

async function loadRelatedVideos(videoId) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&part=snippet&maxResults=6&key=${apiKey}`
    );
    const data = await res.json();
    const container = document.getElementById("relatedContainer");

    data.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "bg-white p-2 shadow rounded";
        div.innerHTML = `
      <img src="${item.snippet.thumbnails.medium.url}" />
      <h4>${item.snippet.title}</h4>
    `;
        div.addEventListener("click", () => {
            localStorage.setItem("videoId", item.id.videoId);
            location.href = "video.html";
        });
        container.appendChild(div);
    });
}

loadVideo();
