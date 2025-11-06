import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPageNew'
import Login from './pages/LoginNew'
import Register from './pages/RegisterNew'
import QuizIntro from './pages/QuizIntro'
import AssessmentQuiz from './pages/AssessmentQuiz'
import Dashboard from './pages/DashboardNew'
import Learn from './pages/Learn'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import { useEffect } from 'react'

// Redirect logged-in users away from auth pages
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Check if user has completed assessment
    const hasAssessment = localStorage.getItem('assessmentCompleted') === 'true';
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    
    // Clear redirect path
    localStorage.removeItem('redirectAfterLogin');
    
    // Redirect based on context
    if (redirectPath && redirectPath !== '/login' && redirectPath !== '/register') {
      return <Navigate to={redirectPath} replace />;
    }
    
    return <Navigate to={hasAssessment ? '/dashboard' : '/quiz-intro'} replace />;
  }
  
  return <>{children}</>;
};

function App() {
  // Clear old/invalid data on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token.startsWith('mock-jwt-token-')) {
      // Check if token is expired (mock: older than 7 days)
      const tokenParts = token.split('-');
      const timestamp = parseInt(tokenParts[tokenParts.length - 1]);
      const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      
      if (timestamp < weekAgo) {
        // Clear expired session
        localStorage.clear();
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes (redirect if already logged in) */}
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/quiz-intro" 
          element={
            <ProtectedRoute>
              <QuizIntro />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/assessment" 
          element={
            <ProtectedRoute>
              <AssessmentQuiz />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/learn" 
          element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
