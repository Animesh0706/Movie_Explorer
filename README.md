# 🎬 Movie Explorer

A modern, responsive movie discovery application built with React, TypeScript, and the TMDB API. Features user authentication, favorites management, beautiful dark/light theme system, and robust network error handling for enterprise environments.

## ✨ Features

### 🎥 Movie Discovery
- **Real-time Search**: Search movies instantly with debounced API calls
- **Popular Movies**: Browse trending and popular movies
- **Movie Details**: Comprehensive movie information with ratings, release dates, and overviews
- **Infinite Scroll**: Seamless pagination for browsing large movie collections
- **High-Quality Images**: Optimized movie posters with lazy loading

### 🔐 Authentication System
- **User Registration & Login**: Complete authentication flow
- **Protected Routes**: Secure access to user-specific features
- **Session Persistence**: Stay logged in across browser sessions
- **Demo Account**: Quick access with demo credentials (demo@example.com / password)

### ❤️ Favorites Management
- **Save Movies**: Add/remove movies from your personal favorites
- **Persistent Storage**: Favorites saved locally and persist across sessions
- **Dedicated Favorites Page**: View and manage your saved movies
- **Visual Indicators**: Clear distinction between favorited and regular movies

### 🎨 Modern UI/UX
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Mobile-first approach with adaptive layouts (2-6 columns)
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Toast Notifications**: User feedback for all actions

### 🌐 Network Compatibility
- **Automatic Network Detection**: Detects firewall/network restrictions
- **Graceful Degradation**: Shows demo content when APIs are blocked
- **Enterprise Ready**: Works in corporate environments with restricted internet
- **Clear User Messaging**: Explains network issues instead of showing broken functionality

## 🛠️ Tech Stack

- **Frontend**: Next 14, TypeScript, Vite
- **Routing**: App Router v6 with protected routes
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI for accessible components
- **State Management**: React Context + Custom Hooks
- **API**: The Movie Database (TMDB) API
- **Storage**: localStorage for authentication and favorites
- **Theme**: next-themes for dark/light mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd movie-explorer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   # Create .env file in root directory
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   \`\`\`

4. **Start development server**
   bash
   npm run dev
  

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 📁 Project Structure


src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── movies/         # Movie-specific components
│   └── ui/             # Base UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── routes/             # Route protection components
├── config/             # Configuration files
└── lib/                # Utility functions


## 🔧 Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set framework preset to **Vite**
   - Add environment variable: `VITE_TMDB_API_KEY`
   - Deploy!

### Other Platforms

The app builds to static files in the `dist/` directory and can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | Your TMDB API key for movie data | Yes |

## 🎯 Key Features Explained

### Authentication Flow
- Uses localStorage for demo purposes (production apps should use secure backend)
- Implements protected routes with automatic redirects
- Maintains user session across browser refreshes
- Demo credentials bypass for easy testing

### Movie Data Management
- Integrates with TMDB API for real-time movie data
- Implements search with debouncing to optimize API calls
- Uses infinite scroll for better user experience
- Fallback to demo content when network is restricted

### Network Error Handling
- **Automatic Detection**: Identifies connection timeouts and API failures
- **User-Friendly Messages**: Clear explanations instead of technical errors
- **Demo Content**: Shows sample movies when external APIs are blocked
- **Enterprise Compatible**: Works in corporate/school networks with firewalls

### Favorites System
- Stores user favorites in localStorage
- Provides visual feedback for favorited movies
- Includes dedicated favorites management page

### Theme System
- Supports light, dark, and system preference modes
- Uses CSS variables for consistent theming
- Smooth transitions between theme changes

## 🏢 Enterprise & Network Considerations

This application is designed to work in various network environments:

- **Corporate Networks**: Handles firewall restrictions gracefully
- **School/University**: Works with content filtering systems
- **Public WiFi**: Manages connection timeouts and restrictions
- **International**: Handles geographic API restrictions

When external APIs are blocked, the app automatically switches to demo mode with sample content, ensuring users can still interact with the interface and understand the functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive movie API
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) team for the amazing framework

---

**Built with ❤️ using Next.js and TypeScript By Me**
