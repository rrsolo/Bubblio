# Bubblio 2.0 - Safe & Fun Videos for Kids

A magical, themed video app built with love for Rishi's little brother — featuring animated themes, personalized settings, and safe YouTube video playback.

## ✨ Features

### 🎬 **Three-Screen Experience**
- **Welcome Screen**: Beautiful animated background with "Start Watching" button
- **Home Screen**: Responsive video grid (1-6 columns based on screen size)
- **Video Player**: Full-screen YouTube player with "Watch Another!" feature

### 🎨 **Four Interactive Themes**
- **🦖 Dinosaur Jungle**: Green forest with swaying animations
- **🐠 Ocean Adventure**: Blue underwater with wave effects
- **🐘 Safari Desert**: Orange desert with glowing sun
- **🕊️ Flying Sky**: Purple sky with drifting clouds

### ⚙️ **Parent-Friendly Settings**
- **Theme Selection**: Visual preview buttons for instant switching
- **Nickname**: Personalize with names like "DinoKid"
- **Favorite Emojis**: Add fun emojis like 🦕 💖 🧸
- **Accent Colors**: Pink, Green, Blue, Yellow, Purple, Orange
- **Sound Toggle**: Mute click/bounce effects
- **Reset Button**: Return to defaults

### 🔐 **Smart Parent Gate**
- **Triple-click** the gear icon (⚙️) to open settings
- **Hold for 1 second** as alternative access method
- Prevents accidental access by kids

### � **Device Support**
- **Mobile**: Touch-optimized, 1-2 column grid
- **Tablet**: 2-3 column responsive layout
- **Desktop**: 4-5 column grid with keyboard navigation
- **TV**: Arrow keys + Enter support
- **Very wide screens**: Max 6 columns

## 🚀 Quick Start

### 1. **Download & Setup**
```bash
# Clone or download the files
git clone [your-repo-url]
cd bubblio-2.0
```

### 2. **Open the App**
- Open `index.html` in any modern browser
- Or deploy to GitHub Pages for online access

### 3. **Start Using**
- Click "Start Watching" to browse videos
- Triple-click the gear (⚙️) to access settings
- Click any video thumbnail to play

## 📂 File Structure

```
bubblio-2.0/
├── index.html          # Main app structure
├── style.css           # Core styles & responsive design
├── themes.css          # Theme-specific styles & animations
├── script.js           # App logic & YouTube API integration
└── README.md           # This file
```

## 🎯 User Flow

### **Welcome Screen**
- Large "Bubblio" title with animated background
- Pulsing "Start Watching" button
- Rishi's personal note
- Settings gear in top-right corner

### **Home Screen (Video Grid)**
- Responsive grid of video thumbnails
- Loading spinner while fetching videos
- Error messages for network/API issues
- Back button to return to welcome

### **Video Player**
- Full-screen YouTube embed with autoplay
- "Back to Videos" button
- "Watch Another!" random video feature
- Theme-matched background

### **Settings Panel**
- Theme preview buttons with emojis
- Nickname and emoji inputs
- Color picker dropdown
- Sound toggle checkbox
- Reset to defaults button

## 🔧 Technical Details

### **YouTube Integration**
- Uses YouTube Data API v3
- Fetches from playlist: `PLO2NpzUDdem3WVqnpyzHHlu_f8att4bsH`
- Handles quota limits and network errors gracefully
- Lazy loading for thumbnails

### **Theme System**
- CSS custom properties for dynamic colors
- Animated backgrounds with keyframes
- Theme-specific shadows and effects
- Instant switching without page reload

### **Local Storage**
- All settings saved in browser localStorage
- No server required
- Works offline (UI only)

### **Accessibility**
- Keyboard navigation (Arrow keys, Enter, Escape, Backspace)
- Focus states for all interactive elements
- Screen reader friendly
- High contrast theme support

## 🎨 Customization

### **Adding New Themes**
1. Add theme definition to `THEMES` array in `script.js`
2. Create theme styles in `themes.css`
3. Add theme preview button logic

### **Changing Colors**
Edit the `getAccentColor()` function in `script.js`:
```javascript
const colors = {
    pink: '#ff90b3',
    green: '#4caf50',
    // Add your colors here
};
```

### **Modifying Animations**
Update keyframes in `themes.css`:
```css
@keyframes yourAnimation {
    0%, 100% { /* start state */ }
    50% { /* middle state */ }
}
```

## 🚀 Deployment

### **GitHub Pages**
1. Upload all files to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Your app will be live at `https://username.github.io/repo-name`

### **Other Static Hosts**
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repo
- **Firebase**: Use Firebase Hosting
- **Any web server**: Upload files to public directory

## 🐛 Troubleshooting

### **Videos Not Loading**
- Check internet connection
- Verify YouTube API key is valid
- Ensure playlist is public
- Check browser console for errors

### **Settings Not Saving**
- Ensure localStorage is enabled
- Try in a different browser
- Check for browser privacy settings

### **Theme Not Changing**
- Clear browser cache
- Check for JavaScript errors
- Verify CSS files are loading

### **Mobile Issues**
- Test on different devices
- Check viewport meta tag
- Verify touch event handling

## 📱 Browser Support

- **Chrome**: 60+ ✅
- **Firefox**: 55+ ✅
- **Safari**: 12+ ✅
- **Edge**: 79+ ✅
- **Mobile browsers**: iOS Safari, Chrome Mobile ✅

## 🔒 Privacy & Security

- **No user accounts** or personal data collection
- **Local storage only** - no server communication
- **YouTube API** for video data only
- **No tracking** or analytics
- **Safe for children** - no external links or ads

## 📄 License

Personal/family use only. Not for public distribution or app stores.

---

**Made with ❤️ by RishiRohith**

*For his little brother to enjoy safe and fun videos*