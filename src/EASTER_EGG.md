# 🎮 Easter Egg - Developer Console

## 🕵️ How to Discover

### For Curious Developers
1. **Check the console** when loading the page - there's a colorful hint! 🎨
2. **Scroll to Contact section** - subtle hint at the bottom
3. **Notice the Terminal icon** in bottom-left corner (faint, becomes visible on hover)

### Console Message
When you open DevTools, you'll see:
```
🎮 Easter Egg Found!
Press "D" to toggle Developer Console
→ Live scroll tracking
→ RGB color values
→ FPS monitoring
→ Orb brightness control
→ Vignette style switcher
```

## 🔓 How to Activate

### In Development Mode
1. Just press **`D`** key anywhere on the page
2. A cyber-styled debug panel appears in the **bottom-left corner**
3. Press **`D`** again to hide it

### In Production Mode
1. Open DevTools console
2. Type: `localStorage.setItem('debug_mode', 'true')`
3. Refresh the page
4. Press **`D`** to toggle

## 📊 Features

### Live Monitoring
- **Scroll Progress** - Visual progress bar + percentage
- **RGB Values** - Live color values of current orb color
- **Color Preview** - Visual swatch of current orb color
- **FPS Counter** - Performance monitoring (green/yellow/red)

### ⚙️ Interactive Controls (NEW!)

#### 1. **Orb Brightness Slider**
- Range: 0.3x - 2.0x
- Default: 1.0x
- Adjusts opacity of all orbs in real-time
- Perfect for fine-tuning background intensity

#### 2. **Vignette Style Switcher**
Four styles to choose from:

**Classic** (default)
- Dark edges, light center
- Professional spotlight effect
- Best for: Content focus

**Inverted**
- Dark center, colorful edges
- Dramatic halo effect
- Best for: Creative/artistic vibe

**Minimal**
- Subtle darkening
- Barely noticeable
- Best for: Full orb visibility

**None**
- No vignette effect
- Pure orb colors
- Best for: Maximum brightness

#### 3. **Reset Button**
- One-click return to defaults
- Resets brightness to 1.0x
- Resets vignette to Classic

### 💾 Settings Persistence
- All settings saved to `localStorage`
- Persists across page refreshes
- Per-browser configuration

## 🎨 Design

### Cyber/Retro Aesthetic
- Glowing border matching current orb color
- Semi-transparent backdrop blur
- Retro monospace font
- Real-time color-adaptive UI

## 🛠️ Technical Details

### File Structure
```
/components/
  ├─ DebugInfo.tsx          ← Easter egg UI + controls
  └─ AnimatedBackground.tsx ← Reads settings via CSS custom properties

CSS Custom Properties:
  --orb-brightness  ← Multiplier (0.3 - 2.0)
  --vignette-style  ← Style name (classic/inverted/minimal/none)
```

### Settings Storage
```javascript
localStorage.getItem('orb_brightness')  // Default: '1.0'
localStorage.getItem('vignette_style')  // Default: 'classic'
localStorage.getItem('debug_mode')      // Enable in production: 'true'
```

### Communication Flow
```
User adjusts slider/radio buttons
       ↓
DebugInfo saves to localStorage
       ↓
CSS custom properties updated
       ↓
AnimatedBackground polls every 100ms
       ↓
Orbs + vignette update in real-time
```

## 🎯 Use Cases

### For Visitors
- "Wow, this site has a hidden dev console!"
- Shows attention to detail
- Professional + fun personality

### For Developers
- Test different visual styles
- Tune orb brightness for their display
- Inspect RGB values for color inspiration
- Monitor performance (FPS)

### For Me (Portfolio Owner)
- Easy visual tuning without code changes
- A/B test different vignette styles
- Quick brightness adjustment per environment
- Shows technical creativity to potential employers

---

**Pro tip:** Screenshots of different vignette styles for client presentations! 📸