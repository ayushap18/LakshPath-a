# LakshPath Frontend

This is the frontend application for LakshPath - an AI-powered career guidance platform for Indian students.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API calls
- **Firebase** for authentication and database

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Backend API running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Firebase credentials and API URL.

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── AssessmentQuiz.tsx
│   └── Dashboard.tsx
├── App.tsx            # Main app component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles

```

## Features

- **Landing Page**: Hero section with features showcase
- **Assessment Quiz**: 20-question interactive career assessment
- **Dashboard**: Personalized career recommendations and learning roadmap
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful user experience

## Environment Variables

- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Firebase app ID
- `VITE_API_BASE_URL`: Backend API base URL

## License

MIT
