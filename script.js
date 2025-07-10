const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your real API key
const PLAYLIST_ID = 'YOUR_PLAYLIST_ID_HERE'; // Replace with your real playlist

const guestBtn = document.getElementById('guest-btn');
const profileBtn = document.getElementById('profile-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const videoScreen = document.getElementById('video-screen');
const videoContainer = document.getElementById('video-container');
const backBtn = document.getElementById('back-btn');

function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      videoContainer.innerHTML = '';
      data.items.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;
        const title = item.snippet.title;
        const thumb = item.snippet.thumbnails.medium.url;

        const div = document.createElement('div');
        div.className = 'video-item';
        div.innerHTML = `
          <img src="${thumb}" alt="${title}" onclick="playVideo('${videoId}')" />
          <p>${title}</p>
        `;
        videoContainer.appendChild(div);
      });
    })
    .catch(err => {
      videoContainer.innerHTML = `<p>Oops! Couldn't load videos. Check internet or try later.</p>`;
      console.error('YouTube API Error:', err);
    });
}

function playVideo(videoId) {
  videoContainer.innerHTML = `
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}?autoplay=1"
    frameborder="0" allowfullscreen></iframe>
  `;
}

guestBtn.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  videoScreen.style.display = 'block';
  fetchVideos();
});

profileBtn.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  videoScreen.style.display = 'block';
  fetchVideos();
});

backBtn.addEventListener('click', () => {
  videoScreen.style.display = 'none';
  welcomeScreen.style.display = 'block';
});