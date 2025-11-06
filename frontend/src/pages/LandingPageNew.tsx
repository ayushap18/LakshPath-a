import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, Zap, Brain, Compass, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const LandingPageNew = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Check user status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    // User is logged in if they have a valid token
    setIsLoggedIn(!!token);
    
    // User is returning if they have visited before or have stored email
    setIsReturningUser(!!(hasVisited || userEmail));
    
    // Mark that user has visited the site
    if (!hasVisited) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  // Smart navigation handler
  const handleGetStarted = () => {
    if (isLoggedIn) {
      // If already logged in, go directly to dashboard
      const hasAssessment = localStorage.getItem('assessmentCompleted') === 'true';
      navigate(hasAssessment ? '/dashboard' : '/quiz-intro');
    } else if (isReturningUser) {
      // Returning user but not logged in - suggest login
      navigate('/login');
    } else {
      // First-time user - take to registration
      navigate('/register');
    }
  };

  const handleSignIn = () => {
    if (isLoggedIn) {
      // Already logged in, go to dashboard
      const hasAssessment = localStorage.getItem('assessmentCompleted') === 'true';
      navigate(hasAssessment ? '/dashboard' : '/quiz-intro');
    } else {
      // Not logged in, go to login page
      navigate('/login');
    }
  };

  // Dynamic button text based on user state
  const getStartedText = isLoggedIn ? 'GO TO DASHBOARD' : isReturningUser ? 'CONTINUE' : 'GET STARTED';
  const signInText = isLoggedIn ? 'MY ACCOUNT' : 'SIGN IN';

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze your skills, interests, and market trends to deliver hyper-personalized career recommendations.",
      color: "from-purple-600 to-indigo-700"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Real-Time Market Data",
      description: "Live job market intelligence and emerging skill demands updated every minute from thousands of sources worldwide.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Compass className="w-12 h-12" />,
      title: "Guided Learning Paths",
      description: "Step-by-step roadmaps with curated courses, certifications, and milestones tailored to your career goals.",
      color: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "AI Mentor 24/7",
      description: "Intelligent chatbot provides instant guidance, answers questions, and helps you make informed career decisions.",
      color: "from-pink-600 to-rose-700"
    },
  ];

  const projects = [
    {
      title: "Software Engineering",
      subtitle: "Full-Stack Development",
      stats: "95% Match Rate",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Data Science",
      subtitle: "ML & AI Specialist",
      stats: "92% Success Rate",
      color: "from-green-600 to-teal-600"
    },
    {
      title: "Product Management",
      subtitle: "Tech Product Strategy",
      stats: "88% Career Growth",
      color: "from-orange-600 to-red-600"
    },
  ];

  return (
    <div className="bg-black text-white overflow-hidden" ref={containerRef}>
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-none flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-black tracking-tight">LAKSHPATH</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleSignIn}
              className="px-6 py-3 text-white font-semibold hover:text-primary-400 transition-colors border border-transparent hover:border-white/20 rounded-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {signInText}
            </motion.button>
            <motion.button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold hover:from-primary-500 hover:to-blue-500 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl hover:shadow-primary-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {getStartedText}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 rounded-full opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
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
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 border border-white/20 rounded-full text-sm font-semibold mb-8"
              animate={{
                boxShadow: ["0 0 20px rgba(99, 102, 241, 0)", "0 0 20px rgba(99, 102, 241, 0.5)", "0 0 20px rgba(99, 102, 241, 0)"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              ✨ AI-POWERED CAREER INTELLIGENCE
            </motion.span>
          </motion.div>

          {/* Main Headline */}
          <div className="overflow-hidden mb-8">
            <motion.h1 
              className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-none tracking-tighter"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <span className="block">WE CRAFT</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                CAREERS
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Next-generation AI platform delivering personalized learning paths,
            real-time market intelligence, and career guidance for tomorrow's workforce
          </motion.p>

          {/* Hero CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={handleGetStarted}
              className="group px-12 py-5 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-black text-lg hover:from-primary-500 hover:to-blue-500 transition-all duration-300 rounded-sm shadow-2xl hover:shadow-primary-500/50 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoggedIn ? 'GO TO DASHBOARD' : isReturningUser ? 'CONTINUE YOUR JOURNEY' : 'START YOUR JOURNEY'}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
            
            <motion.button
              onClick={handleSignIn}
              className="px-12 py-5 border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 rounded-sm backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {signInText}
            </motion.button>
          </motion.div>

          {/* Scroll Indicator - Moved Higher */}
          <motion.div
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll Down</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-gray-500 uppercase tracking-widest mb-4 block">FEATURED PATHS</span>
            <h2 className="text-5xl md:text-7xl font-black">
              CAREER <span className="text-primary-500">JOURNEYS</span>
            </h2>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ x: 20 }}
              >
                <div className="border-t border-white/10 pt-8 pb-8">
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div className="flex-1">
                      <h3 className="text-4xl md:text-6xl font-black mb-2 group-hover:text-primary-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xl text-gray-500">{project.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-sm text-gray-500 uppercase tracking-wider">{project.stats}</span>
                      <motion.div
                        className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-white text-black relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-gray-500 uppercase tracking-widest mb-4 block">HOW WE DO IT</span>
            <h2 className="text-5xl md:text-7xl font-black">
              POWERED BY <span className="text-primary-600">AI</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
              >
                <motion.div
                  className="border-2 border-black p-12 h-full relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <motion.div
                    className={`inline-flex p-4 bg-gradient-to-r ${feature.color} text-white mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-3xl font-black mb-4 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  <motion.div
                    className="mt-6 flex items-center gap-2 font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    LEARN MORE <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #6366f1 0%, #000 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8">
              READY TO START?
            </h2>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              {isLoggedIn 
                ? 'Continue building your career with AI-powered guidance' 
                : isReturningUser 
                  ? 'Welcome back! Continue your career journey' 
                  : 'Join over 1 million students shaping their future with AI-powered career guidance'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetStarted}
                className="px-16 py-6 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-black text-xl hover:from-primary-500 hover:to-blue-500 transition-all duration-300 rounded-sm shadow-2xl hover:shadow-primary-500/50"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoggedIn ? 'GO TO DASHBOARD' : isReturningUser ? 'CONTINUE NOW' : 'GET STARTED NOW'}
              </motion.button>
              <motion.button
                onClick={handleSignIn}
                className="px-12 py-6 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {signInText}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-500" />
              <span className="text-2xl font-black">LAKSHPATH</span>
            </div>
            <div className="flex gap-8">
              <a href="tel:+917982659056" className="text-gray-400 hover:text-white transition">
                +91 7982659056
              </a>
              <span className="text-gray-600">MSI Janakpuri, Delhi</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            © 2025 LakshPath. Crafting careers with AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageNew;
