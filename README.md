# TempoType - Adaptive Audio Typing Practice

TempoType is a revolutionary typing practice application that adapts to your speed! Our AI-powered system automatically adjusts audio playback speed based on how fast you type, creating the perfect personalized learning experience.

## 🚀 Features

- **Adaptive Speed Technology**: Audio automatically matches your typing pace for optimal learning
- **Real-time Analytics**: Live WPM, accuracy tracking, and performance insights
- **Smart Audio Processing**: Crystal clear speech at any speed from 0.25x to 2.0x
- **Progress Tracking**: Comprehensive statistics and achievement system
- **Audio Library**: Browse and manage audio content for typing practice

## 📁 Project Structure

```
TempoType/
├── frontend/                 # React + TypeScript frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── TabComponents/    # Tab-specific components
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── AdaptiveTyping.tsx
│   │   │   │   ├── StatsPage.tsx
│   │   │   │   └── AudioLibraryPage.tsx
│   │   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   │   └── TabContent.tsx    # Tab switching logic
│   │   ├── App.tsx           # Main application component
│   │   ├── main.tsx          # Application entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
├── server/                   # Node.js backend server
│   ├── src/
│   │   ├── controllers/      # API controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   └── app.ts            # Server entry point
│   └── package.json          # Backend dependencies
└── scripts/                  # Utility scripts
```

## 🎯 Frontend

The frontend is built with modern React and TypeScript, providing a responsive and intuitive user interface.

### Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Heroicons** - Beautiful SVG icons for React

### Component Architecture

#### Core Components

- **App.tsx** - Main application layout with sidebar and content area
- **Sidebar.tsx** - Navigation component with dark mode toggle
- **TabContent.tsx** - Manages tab switching and component rendering

#### Tab Components

- **HomePage.tsx** - Landing page with feature overview and call-to-action
- **AdaptiveTyping.tsx** - Main typing practice interface with audio controls
- **StatsPage.tsx** - Statistics dashboard with progress tracking
- **AudioLibraryPage.tsx** - Audio content management interface

### Key Features

#### Adaptive Typing Interface
- Real-time WPM calculation and display
- Audio playback speed adjustment based on typing speed
- Live accuracy tracking and performance metrics
- Interactive typing area with visual feedback

#### Responsive Design
- Clean, modern UI with gradient backgrounds
- Smooth transitions and hover effects
- Mobile-responsive layout
- Dark mode support

#### Navigation System
- Sidebar navigation with active state highlighting
- Smooth tab switching between different views
- Consistent routing and state management

### Development Setup

#### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

#### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TempoType
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

#### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Build and Deployment

#### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

#### Environment Configuration

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=TempoType
```

### Code Style and Standards

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code quality and consistency rules
- **Prettier** - Code formatting (recommended)
- **Component Structure** - Functional components with TypeScript interfaces
- **File Organization** - Components grouped by functionality in dedicated folders

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Backend

The backend provides API endpoints for user management, audio processing, and progress tracking.

### Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side development
- **MongoDB** - Document database for data storage

### API Endpoints

- `/api/auth` - User authentication and authorization
- `/api/users` - User profile management
- `/api/audio` - Audio file management and processing
- `/api/typing` - Typing session data and statistics

## 🚀 Getting Started


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


**Happy Typing!** 🎯⚡
