// Bubblio 2.0 - Main JavaScript

// Configuration
const API_KEY = 'AIzaSyDlsqMzQBOW8rliC2BdpyBOV3Hs8_2bVDA';
const PLAYLIST_ID = 'PLO2NpzUDdem3WVqnpyzHHlu_f8att4bsH';

// Theme definitions
const THEMES = [
    { key: 'dino', name: 'Dinosaur Jungle', emoji: '🦖', desc: 'Green jungle with dinosaurs' },
    { key: 'ocean', name: 'Ocean Adventure', emoji: '🐠', desc: 'Blue underwater world' },
    { key: 'safari', name: 'Safari Desert', emoji: '🐘', desc: 'Orange desert safari' },
    { key: 'flying', name: 'Flying Sky', emoji: '🕊️', desc: 'Sky blues with clouds' }
];

// DOM Elements
const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const videoScreen = document.getElementById('video-screen');
const videoContainer = document.getElementById('video-container');
const backBtn = document.getElementById('back-btn');
const nicknameDisplay = document.getElementById('nickname-display');
const settingsGear = document.getElementById('settings-gear');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const themePreviews = document.getElementById('theme-previews');
const nicknameInput = document.getElementById('nickname-input');
const emojiInput = document.getElementById('emoji-input');
const colorSelect = document.getElementById('color-select');
const soundToggle = document.getElementById('sound-toggle');
const resetBtn = document.getElementById('reset-btn');

// App State
let settings = {
    theme: 'dino',
    nickname: '',
    emoji: '',
    color: 'pink',
    sound: true
};

// Parent Gate Variables
let gearClicks = 0;
let gearTimer = null;

// Initialize App
function init() {
    loadSettings();
    injectThemePreviews();
    applySettings();
    setupEventListeners();
    setupParentGate();
}

// Settings Management
function saveSettings() {
    localStorage.setItem('bubblio2_settings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('bubblio2_settings');
    if (saved) {
        try {
            Object.assign(settings, JSON.parse(saved));
        } catch (e) {
            console.log('Using default settings');
        }
    }
}

function applySettings() {
    // Apply theme
    document.body.className = `theme-${settings.theme}`;
    
    // Apply accent color
    const accentColor = getAccentColor(settings.color);
    document.documentElement.style.setProperty('--accent', accentColor);
    
    // Update nickname display
    updateNicknameDisplay();
    
    // Update form values
    nicknameInput.value = settings.nickname;
    emojiInput.value = settings.emoji;
    colorSelect.value = settings.color;
    soundToggle.checked = !settings.sound;
    
    // Update theme preview selection
    updateThemePreviews();
}

function getAccentColor(color) {
    const colors = {
        pink: '#ff90b3',
        green: '#4caf50',
        blue: '#2196f3',
        yellow: '#ffd600'
    };
    return colors[color] || colors.pink;
}

function updateNicknameDisplay() {
    const display = settings.nickname || settings.emoji ? 
        `${settings.emoji || ''} ${settings.nickname || ''}` : '';
    nicknameDisplay.innerHTML = display;
}

function updateThemePreviews() {
    document.querySelectorAll('.theme-preview-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.theme === settings.theme);
    });
}

// Theme Previews
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
            playSound('bounce');
        };
        themePreviews.appendChild(btn);
    });
}

// Parent Gate
function setupParentGate() {
    // Triple click
    settingsGear.addEventListener('click', () => {
        gearClicks++;
        if (gearClicks === 3) {
            openSettings();
            gearClicks = 0;
            return;
        }
        clearTimeout(gearTimer);
        gearTimer = setTimeout(() => { gearClicks = 0; }, 1500);
    });
    
    // Hold to open
    settingsGear.addEventListener('mousedown', () => {
        gearTimer = setTimeout(() => {
            openSettings();
            gearClicks = 0;
        }, 1000);
    });
    
    settingsGear.addEventListener('mouseup', () => {
        clearTimeout(gearTimer);
    });
    
    settingsGear.addEventListener('mouseleave', () => {
        clearTimeout(gearTimer);
    });
}

// Settings Panel
function openSettings() {
    settingsPanel.setAttribute('aria-hidden', 'false');
    playSound('click');
}

function closeSettings() {
    settingsPanel.setAttribute('aria-hidden', 'true');
    playSound('click');
}

// Event Listeners
function setupEventListeners() {
    // Start watching
    startBtn.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        videoScreen.style.display = 'block';
        fetchVideos();
        playSound('click');
    });
    
    // Back button
    backBtn.addEventListener('click', () => {
        videoScreen.style.display = 'none';
        welcomeScreen.style.display = 'block';
        playSound('click');
    });
    
    // Close settings
    closeSettings.addEventListener('click', closeSettings);
    
    // Settings form
    nicknameInput.addEventListener('input', () => {
        settings.nickname = nicknameInput.value;
        saveSettings();
        updateNicknameDisplay();
    });
    
    emojiInput.addEventListener('input', () => {
        settings.emoji = emojiInput.value;
        saveSettings();
        updateNicknameDisplay();
    });
    
    colorSelect.addEventListener('change', () => {
        settings.color = colorSelect.value;
        saveSettings();
        applySettings();
    });
    
    soundToggle.addEventListener('change', () => {
        settings.sound = !soundToggle.checked;
        saveSettings();
    });
    
    resetBtn.addEventListener('click', () => {
        settings = {
            theme: 'dino',
            nickname: '',
            emoji: '',
            color: 'pink',
            sound: true
        };
        saveSettings();
        applySettings();
        playSound('bounce');
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsPanel.getAttribute('aria-hidden') === 'false') {
            closeSettings();
        }
        if (e.key === 'Backspace' && videoScreen.style.display !== 'none') {
            backBtn.click();
        }
    });
}

// Sound Effects
function playSound(type) {
    if (!settings.sound) return;
    
    // Create audio context for better compatibility
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'click') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    } else if (type === 'bounce') {
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2);
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// YouTube API Integration
let loadingSpinner = null;

function showLoading() {
    if (!loadingSpinner) {
        loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        loadingSpinner.innerHTML = `
            <div class="spinner"></div>
            <p>Loading videos...</p>
        `;
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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            hideLoading();
            videoContainer.innerHTML = '';
            
            if (!data.items || data.items.length === 0) {
                videoContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; color: #666;">No videos found in this playlist.</p>';
                return;
            }
            
            data.items.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                const title = item.snippet.title;
                const thumb = item.snippet.thumbnails.medium.url;
                
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.innerHTML = `
                    <img src="${thumb}" alt="${title}" loading="lazy">
                    <p>${title}</p>
                `;
                videoItem.addEventListener('click', () => playVideo(videoId));
                videoContainer.appendChild(videoItem);
            });
        })
        .catch(error => {
            hideLoading();
            console.error('YouTube API Error:', error);
            
            let errorMessage = 'Oops! Couldn\'t load videos. Try again later.';
            
            if (!navigator.onLine) {
                errorMessage = 'Try again when you\'re back online!';
            } else if (error.message.includes('403')) {
                errorMessage = 'YouTube API quota exceeded. Try again tomorrow.';
            } else if (error.message.includes('400')) {
                errorMessage = 'Playlist not found or private.';
            }
            
            videoContainer.innerHTML = `<p style="text-align: center; font-size: 1.2rem; color: #666;">${errorMessage}</p>`;
        });
}

function playVideo(videoId) {
    videoContainer.innerHTML = `
        <div style="width: 100%; max-width: 800px; margin: 0 auto;">
            <iframe 
                width="100%" 
                height="450" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                frameborder="0" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    playSound('click');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);