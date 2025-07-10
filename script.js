const API_KEY = 'AIzaSyDlsqMzQBOW8rliC2BdpyBOV3Hs8_2bVDA';
const PLAYLIST_ID = 'PLO2NpzUDdem3WVqnpyzHHlu_f8att4bsH';

// Theme definitions
const THEMES = [
  { key: 'dino', name: 'Dinosaur Jungle', emoji: '🦖', desc: 'Green jungle, vines, eggs, dino icons' },
  { key: 'ocean', name: 'Ocean Adventure', emoji: '🐠', desc: 'Blue underwater, bubbles, coral, fish' },
  { key: 'safari', name: 'Safari Desert', emoji: '🐘', desc: 'Orange desert, sun, jeep, animals' },
  { key: 'flying', name: 'Flying Sky', emoji: '🕊️', desc: 'Sky blues, clouds, balloons, birds' },
];
const ACCENT_COLORS = ['pink', 'green', 'blue', 'yellow'];

// DOM
const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const videoScreen = document.getElementById('video-screen');
const videoContainer = document.getElementById('video-container');
const backBtn = document.getElementById('back-btn');
const nicknameBar = document.getElementById('nickname-bar');
const settingsGear = document.getElementById('settings-gear');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const themePreviews = document.getElementById('theme-previews');
const nicknameInput = document.getElementById('nickname-input');
const emojiInput = document.getElementById('emoji-input');
const colorSelect = document.getElementById('color-select');
const soundToggle = document.getElementById('sound-toggle');
const resetBtn = document.getElementById('reset-btn');

// SFX
let clickSfx = new Audio('assets/click.mp3');
let bounceSfx = new Audio('assets/bounce.mp3');

// State
let settings = {
  theme: 'dino',
  nickname: '',
  emoji: '',
  color: 'pink',
  sound: true,
};

function saveSettings() {
  localStorage.setItem('bubblio2_settings', JSON.stringify(settings));
}
function loadSettings() {
  const s = localStorage.getItem('bubblio2_settings');
  if (s) Object.assign(settings, JSON.parse(s));
}
function applySettings() {
  document.body.className = `theme-${settings.theme}`;
  document.body.style.setProperty('--accent', accentColor(settings.color));
  nicknameBar.innerHTML = settings.nickname || settings.emoji ?
    `<span>${settings.emoji || ''} ${settings.nickname || ''}</span>` : '';
  colorSelect.value = settings.color;
  soundToggle.checked = !settings.sound;
  nicknameInput.value = settings.nickname;
  emojiInput.value = settings.emoji;
  // Theme preview highlight
  document.querySelectorAll('.theme-preview-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.theme === settings.theme);
  });
}
function accentColor(color) {
  switch (color) {
    case 'green': return '#4caf50';
    case 'blue': return '#2196f3';
    case 'yellow': return '#ffd600';
    default: return '#ff90b3';
  }
}
function playSfx(type) {
  if (!settings.sound) return;
  if (type === 'click') clickSfx.play();
  if (type === 'bounce') bounceSfx.play();
}

// Theme previews
function injectThemePreviews() {
  themePreviews.innerHTML = '';
  THEMES.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'theme-preview-btn';
    btn.dataset.theme = theme.key;
    btn.title = theme.name;
    btn.innerHTML = theme.emoji;
    btn.onclick = () => {
      settings.theme = theme.key;
      saveSettings();
      applySettings();
      playSfx('bounce');
    };
    themePreviews.appendChild(btn);
  });
}

// Parent gate: triple-click or hold
let gearClicks = 0, gearTimer = null;
settingsGear.addEventListener('click', () => {
  gearClicks++;
  if (gearClicks === 3) {
    openSettings();
    gearClicks = 0;
    return;
  }
  clearTimeout(gearTimer);
  gearTimer = setTimeout(() => { gearClicks = 0; }, 1200);
});
settingsGear.addEventListener('mousedown', e => {
  gearTimer = setTimeout(() => {
    openSettings();
    gearClicks = 0;
  }, 900);
});
settingsGear.addEventListener('mouseup', e => {
  clearTimeout(gearTimer);
});
settingsGear.addEventListener('mouseleave', e => {
  clearTimeout(gearTimer);
});
function openSettings() {
  settingsPanel.setAttribute('aria-hidden', 'false');
  playSfx('click');
}
function closeSettingsPanel() {
  settingsPanel.setAttribute('aria-hidden', 'true');
  playSfx('click');
}
closeSettings.onclick = closeSettingsPanel;

// Settings panel logic
nicknameInput.oninput = e => {
  settings.nickname = nicknameInput.value;
  saveSettings();
  applySettings();
};
emojiInput.oninput = e => {
  settings.emoji = emojiInput.value;
  saveSettings();
  applySettings();
};
colorSelect.onchange = e => {
  settings.color = colorSelect.value;
  saveSettings();
  applySettings();
};
soundToggle.onchange = e => {
  settings.sound = !soundToggle.checked;
  saveSettings();
};
resetBtn.onclick = () => {
  settings = { theme: 'dino', nickname: '', emoji: '', color: 'pink', sound: true };
  saveSettings();
  applySettings();
  playSfx('bounce');
};

// Start watching
startBtn.onclick = () => {
  welcomeScreen.style.display = 'none';
  videoScreen.style.display = 'block';
  fetchVideos();
  playSfx('click');
};
backBtn.onclick = () => {
  videoScreen.style.display = 'none';
  welcomeScreen.style.display = 'block';
  playSfx('click');
};

// Video fetch & lazy load
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
        const img = document.createElement('img');
        img.alt = title;
        img.setAttribute('data-src', thumb);
        img.className = 'lazy';
        img.onclick = () => playVideo(videoId);
        div.appendChild(img);
        const p = document.createElement('p');
        p.textContent = title;
        div.appendChild(p);
        videoContainer.appendChild(div);
      });
      lazyLoadImages();
    })
    .catch(err => {
      hideLoading();
      if (!navigator.onLine) {
        videoContainer.innerHTML = '<p>Try again when you\'re back online!</p>';
      } else {
        videoContainer.innerHTML = `<p>Oops! Couldn\'t load videos. Try again later.</p>`;
      }
      console.error('YouTube API Error:', err);
    });
}
function playVideo(videoId) {
  videoContainer.innerHTML = `
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}?autoplay=1"
    frameborder="0" allowfullscreen></iframe>
  `;
  playSfx('click');
}

// Lazy load images
function lazyLoadImages() {
  const imgs = document.querySelectorAll('img.lazy');
  const config = { rootMargin: '50px 0px', threshold: 0.01 };
  const onIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersection, config);
  imgs.forEach(img => observer.observe(img));
}

// Device support: keyboard, remote, touch
window.addEventListener('keydown', e => {
  if (settingsPanel.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') closeSettingsPanel();
  if (videoScreen.style.display !== 'none' && e.key === 'Backspace') backBtn.click();
});

// Init
loadSettings();
injectThemePreviews();
applySettings();

// Accessibility: focus trap for settings
settingsPanel.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    const focusable = settingsPanel.querySelectorAll('input,select,button');
    const first = focusable[0];
    const last = focusable[focusable.length-1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
});