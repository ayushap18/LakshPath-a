import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Target, User } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.name.length < 2) {
      alert('Name must be at least 2 characters');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);

    // Simulate API call - Mock registration
    setTimeout(() => {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: 'user-' + Date.now(),
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim()
      };

      // Store user data in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userId', mockUser.id);
      localStorage.setItem('userName', mockUser.name);
      localStorage.setItem('userEmail', mockUser.email);
      localStorage.setItem('registrationDate', new Date().toISOString());
      localStorage.setItem('assessmentCompleted', 'false'); // New user hasn't taken assessment
      
      // Navigate to quiz intro for new users
      navigate('/quiz-intro');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black">LAKSHPATH</span>
          </Link>
          <p className="text-gray-400 text-lg">Start your journey today</p>
        </motion.div>

        {/* Register Card */}
        <motion.div
          className="bg-white/5 backdrop-blur-md border border-white/10 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl font-black mb-8 text-center">CREATE ACCOUNT</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                required
                className="w-4 h-4 mt-1 bg-white/5 border-white/10 rounded"
              />
              <label className="text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-400 hover:text-primary-300">
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary-400 hover:text-primary-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-4 font-bold text-lg flex items-center justify-center gap-3 transition ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                  : 'bg-white text-black hover:bg-primary-500 hover:text-white'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  CREATING ACCOUNT...
                </>
              ) : (
                <>
                  CREATE ACCOUNT <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          className="text-center mt-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Already have an account?{' '}
          <Link to="/login" className="text-white font-bold hover:text-primary-400 transition">
            SIGN IN
          </Link>
        </motion.p>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link 
            to="/" 
            className="text-gray-500 text-sm hover:text-gray-300 transition inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
