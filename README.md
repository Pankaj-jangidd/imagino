# IMAGINO - AI Image Generation Platform

A beautiful, modern AI-powered image generation platform built with Next.js. Generate stunning images from text prompts using the free Pollinations.ai API.

🔗 **Live Demo**: [https://imagino-mu.vercel.app](https://imagino-mu.vercel.app)

![IMAGINO Preview](https://via.placeholder.com/800x400/1a1a2e/00EEFF?text=IMAGINO+-+AI+Image+Generator)

## 🚀 Features

### AI Image Generation
- Generate images from text prompts using Pollinations.ai API
- **Free and open-source** - No API keys required
- Multiple style filters: Photorealistic, Anime, 3D Render, Cyberpunk, Oil Painting
- Customizable image settings (width, height, steps, guidance)

### AI Prompt Enhancer
- Transform simple prompts into detailed, professional descriptions
- Powered by Pollinations.ai text API
- One-click enhancement with the "Enhance" button

### Modern UI/UX
- Stunning dark theme with glassmorphism effects
- Fully responsive design (Desktop & Mobile)
- Dynamic search bar that expands with your prompt
- Smooth animations and hover effects
- Real-time loading states with beautiful loaders

### History & Persistence
- Image generation history saved in localStorage
- Current prompt and image persist across page reloads
- Easy access to previous generations via sidebar

### Settings Panel
- Adjustable image dimensions (width/height)
- Control generation steps and guidance scale
- Seed control for reproducible generations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **AI API**: Pollinations.ai (Free, no API key needed)
- **State Management**: React Hooks + localStorage

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Pankaj-jangidd/IMAGINO.git
cd IMAGINO
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open the application**
```
http://localhost:3000
```

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main application page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── SettingsModal.tsx # Settings modal component
│       ├── Setting-panel.tsx # Settings panel
│       ├── Image-history.tsx # Image history component
│       ├── CustomLoader.tsx  # Loading animation
│       └── ui/               # Reusable UI components
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── Input.tsx
│           ├── Slider.tsx
│           ├── Tabs.tsx
│           └── Badge.tsx
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── next.config.ts            # Next.js configuration
└── package.json
```

## 🎨 Pages & Features

| Route | Description |
|-------|-------------|
| `/` | Main image generation interface |

### UI Components
- **Hero Section**: Welcome message with animated text
- **Prompt Input**: Dynamic textarea with style filters
- **Image Display**: Generated image with download option
- **Gallery**: Sample images showcase
- **Sidebar**: History and navigation (Desktop)
- **Bottom Navigation**: Mobile-friendly navigation

## 🎯 Style Filters

| Style | Effect |
|-------|--------|
| All Styles | No additional enhancement |
| Photorealistic | Ultra detailed, 8K, high quality photography |
| Anime | Studio Ghibli style, vibrant colors, manga art |
| 3D Render | Octane render, Unreal Engine, highly detailed |
| Cyberpunk | Neon lights, futuristic city, dystopian |
| Oil Painting | Classical art, brush strokes, masterpiece |

## 🔧 Configuration

### Image Settings
- **Width**: 128 - 2048 pixels
- **Height**: 128 - 2048 pixels
- **Steps**: 1 - 50 (inference steps)
- **Guidance**: 1 - 20 (prompt adherence)
- **Seed**: Random or fixed for reproducibility

## 🚀 Deployment

This application is designed to be deployed on Vercel:

```bash
npm run build
```

Then deploy to Vercel:
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

MIT License - feel free to use this project for learning and personal purposes.

## 👤 Author

**Pankaj Kumar**

- GitHub: [@Pankaj-jangidd](https://github.com/Pankaj-jangidd)

---

Built with ❤️ using Next.js and Pollinations.ai
