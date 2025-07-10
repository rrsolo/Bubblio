const API_KEY = 'AIzaSyDlsqMzQBOW8rliC2BdpyBOV3Hs8_2bVDA'; // <-- Your real API key
const PLAYLIST_ID = 'PLU8ezI8GYqs7w1_2JjJp5X6lQ2k6U6z1U'; // Example: Kid-friendly playlist (replace if you want)

const guestBtn = document.getElementById('guest-btn');
const profileBtn = document.getElementById('profile-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const videoScreen = document.getElementById('video-screen');
const videoContainer = document.getElementById('video-container');
const backBtn = document.getElementById('back-btn');

let loadingSpinner;

function showLoading() {
  if (!loadingSpinner) {
    loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.innerHTML = '<div class="spinner"></div><p>Loading videos...</p>';
    videoContainer.appendChild(loadingSpinner);
  }
}

function hideLoading() {
  if (loadingSpinner) {
    loadingSpinner.remove();
    loadingSpinner = null;
  }
}

function fetchVideos() {
  showLoading();
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      hideLoading();
      videoContainer.innerHTML = '';
      if (!data.items || data.items.length === 0) {
        videoContainer.innerHTML = '<p>No videos found in this playlist.</p>';
        return;
      }
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
      hideLoading();
      videoContainer.innerHTML = `<p>Oops! Couldn't load videos. Check your internet or try again later.</p>`;
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