# Bubblio 2.0

A magical, themed, kid-safe video app for Rishi's little brother — now with animated themes, personalization, and instant access to curated YouTube videos.

## Features
- 🎬 **Start Watching**: No login, instant access to safe videos
- 🎨 **Themes**: Dinosaur, Ocean, Safari, Flying — with animated backgrounds
- ⚙️ **Settings**: Choose theme, nickname, favorite emoji, accent color, and sound options (all local, no account)
- 🧒 **Child-Safe**: Big buttons, fun visuals, no text-heavy flows
- 🔐 **Parent Gate**: Settings protected by a simple unlock gesture
- 📺 **YouTube Playlist**: Only videos from a single, curated playlist
- 📱 **Responsive**: Works on TV, tablet, mobile, and desktop

## Setup & Deployment
1. **Clone or download** this repo.
2. **Add your YouTube API key** in `script.js` (already set if you used the provided key).
3. **Static hosting**: Just upload to GitHub Pages or any static host. No backend needed.
4. **Assets**: Place theme icons/images in the `assets/` folder.

## File Structure
- `index.html` — Main UI
- `style.css` — Base and responsive styles
- `themes.css` — Theme-specific styles (class-based switching)
- `script.js` — App logic, API fetch, customization
- `assets/` — Theme icons, images, and animations

## Playlist Source
- Only uses: https://youtube.com/playlist?list=PLO2NpzUDdem3WVqnpyzHHlu_f8att4bsH

## Local Customization
- All settings are stored in `localStorage` (no personal data, no server)

## License
Personal/family use only. Not for public distribution or app stores.