
# 🌟 Jungle Math Adventure - Multiplication Game

A fun, interactive multiplication game for children featuring an animated jungle theme with engaging sound effects and visual feedback.

![Jungle Math Adventure](https://img.shields.io/badge/Game-Jungle%20Math%20Adventure-green) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## 🎮 Game Overview

Jungle Math Adventure is an educational multiplication game designed for children. Players help jungle animals solve multiplication problems through multiple levels with increasing difficulty. The game features:

- **Animated jungle background** with flying birds, swaying trees, and floating elements
- **Interactive animal characters** as answer options
- **Progressive difficulty** across multiple levels
- **Sound effects** for correct/incorrect answers and celebrations
- **Visual feedback** with celebration animations
- **Child-friendly interface** with vibrant colors and engaging animations

## 🛠️ Technologies Used

### Core Framework & Build Tools
- **React 18.3.1** - Frontend framework for building the user interface
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **React Router DOM 6.26.2** - Client-side routing

### Styling & UI Components
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Tailwind CSS Animate** - Animation utilities for Tailwind
- **Shadcn/UI Components** - Pre-built, accessible UI components including:
  - Dialog components for modals
  - Button components
  - Toast notifications
  - Various Radix UI primitives

### Icons & Visual Elements
- **Lucide React 0.462.0** - Icon library (used for volume control)
- **Emoji Characters** - Jungle animals and nature emojis for visual appeal

### State Management & Data Fetching
- **TanStack React Query 5.56.2** - Server state management and data fetching
- **React Hooks** - Built-in state management (useState, useEffect)

### Additional Libraries
- **Class Variance Authority** - Utility for managing CSS class variants
- **clsx & Tailwind Merge** - Conditional className utilities
- **React Hook Form** - Form handling (available but not used in current implementation)
- **Zod** - TypeScript-first schema validation

## 🔊 Sound System Implementation

The game features a custom Web Audio API implementation for sound effects:

### How Sound Works
1. **Web Audio Context**: Creates an audio context using `AudioContext` or `webkitAudioContext`
2. **Oscillator Nodes**: Generates different frequency tones for different events
3. **Gain Nodes**: Controls volume and creates fade-out effects

### Sound Types
- **Correct Answer**: Ascending musical notes (C5 → E5 → G5)
- **Incorrect Answer**: Descending notes (A3 → G3)
- **Level Completion**: Celebratory ascending scale (C5 → E5 → G5 → C6)

### Sound Implementation Details
```typescript
// Frequency mapping for musical notes
C5: 523.25 Hz, E5: 659.25 Hz, G5: 783.99 Hz, C6: 1046.5 Hz
A3: 220 Hz, G3: 196 Hz
```

The sound system is:
- **Browser-native** (no external audio libraries)
- **Lightweight** (programmatically generated tones)
- **Toggleable** (users can mute/unmute)
- **Cross-browser compatible** (fallback for webkit browsers)

## 🎨 Animation System

### Background Animations
- **Flying Elements**: Birds and butterflies move across the screen with `@keyframes fly`
- **Swaying Trees**: Gentle rotation animation with `@keyframes sway`
- **Floating Leaves**: Vertical movement with rotation using `@keyframes float`
- **Drifting Clouds**: Horizontal movement across the screen
- **Glowing Sun**: Scale and brightness effects

### Interactive Animations
- **Bounce Effects**: Applied to animal emojis and UI elements
- **Hover Scales**: Buttons grow slightly on hover
- **Pulse Effects**: Star ratings and celebration elements
- **Spin Animations**: Trophy and celebration icons

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Modern web browser with JavaScript enabled

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd jungle-math-adventure
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:8080` (or the port shown in terminal)
   - The game will automatically load with the animated jungle background

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── MultiplicationGame.tsx    # Main game logic
│   ├── QuestionDisplay.tsx       # Question presentation
│   ├── AnswerOptions.tsx         # Answer choice buttons
│   ├── ScoreBoard.tsx            # Score and level display
│   ├── FeedbackModal.tsx         # Correct/incorrect feedback
│   └── CelebrationModal.tsx      # Level completion celebration
├── pages/              # Page components
│   └── Index.tsx       # Main page with jungle background
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── index.css           # Global styles and animations
└── main.tsx           # Application entry point
```

## 🎯 Game Features

### Core Gameplay
- **Progressive Levels**: Difficulty increases with each level
- **Question Generation**: Random multiplication problems (1×1 to 5×5)
- **Multiple Choice**: 4 answer options with visual animal representations
- **Score System**: 10 points per correct answer
- **Question Tracking**: Prevents repeated questions within the same level

### Visual Design
- **Jungle Theme**: Tropical background with animated elements
- **Child-Friendly Colors**: Vibrant greens, yellows, and blues
- **Animal Characters**: Monkey (🐵), Banana (🍌), Parrot (🦜), Frog (🐸), Butterfly (🦋), Bug (🐛)
- **Responsive Design**: Works on desktop and mobile devices

### Accessibility Features
- **Sound Toggle**: Players can enable/disable sound effects
- **Clear Visual Feedback**: Large, colorful buttons and text
- **Intuitive Navigation**: Simple click/tap interactions

## 🔧 Configuration & Customization

### Modifying Game Difficulty
Edit `src/components/MultiplicationGame.tsx`:
```typescript
// Change maximum number range per level
const maxNum = Math.min(currentLevel + 1, 5); // Currently goes up to 5×5
```

### Adding New Sound Effects
Extend the `playSound` function in `MultiplicationGame.tsx`:
```typescript
// Add new sound types
playSound('levelUp' | 'gameOver' | 'buttonClick');
```

### Customizing Animations
Modify animation keyframes in `src/index.css`:
```css
@keyframes your-custom-animation {
  /* Define your animation steps */
}
```

## 🌐 Deployment

The project can be deployed to various platforms:

### Lovable Platform (Recommended)
- Click the "Publish" button in the Lovable editor
- Automatic deployment with custom domain support

### Other Platforms
- **Vercel**: `npm run build` → deploy `dist` folder
- **Netlify**: Connect GitHub repo for automatic builds
- **GitHub Pages**: Configure GitHub Actions for deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🎮 Game Controls

- **Click/Tap**: Select answer options
- **Volume Button**: Toggle sound effects on/off
- **Next Question**: Automatic progression after answering
- **Level Progression**: Complete 5 questions to advance to next level

## 🏆 Educational Benefits

- **Multiplication Mastery**: Practice basic multiplication facts
- **Pattern Recognition**: Visual representation of multiplication concepts
- **Immediate Feedback**: Learn from mistakes with encouraging messages
- **Progressive Learning**: Difficulty adapts to player progress
- **Engagement**: Game mechanics keep children motivated to learn

## 🐛 Troubleshooting

### Common Issues
1. **Sound not working**: Check browser audio permissions and volume
2. **Animations laggy**: Try closing other browser tabs or applications
3. **Game not loading**: Ensure JavaScript is enabled in browser
4. **Touch not working**: Clear browser cache and reload

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**Made with ❤️ for young mathematicians exploring the jungle of numbers!**
