import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Award,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';

const QuizIntro = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'quiz' | 'dashboard' | null>(null);

  const handleContinue = () => {
    if (selectedOption === 'quiz') {
      navigate('/assessment');
    } else if (selectedOption === 'dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-sm bg-green-500 text-white flex items-center justify-center font-black border-2 border-green-400">
                ✓
              </div>
              <span className="font-bold text-white">Sign Up</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center font-black border-2 border-purple-400">
                2
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Choose Method</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-sm bg-white/10 border-2 border-white/20 text-gray-400 flex items-center justify-center font-black">
                3
              </div>
              <span className="text-gray-500 font-bold">AI Analysis</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-sm text-purple-400 text-sm font-black uppercase tracking-wider">
              Step 2 of 3
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            LET'S GET TO KNOW
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              YOU BETTER
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
            Choose how you'd like to share your information with our AI career advisor
          </p>
        </motion.div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {/* Quiz Option */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedOption('quiz')}
            className={`relative bg-white/5 backdrop-blur-xl rounded-sm shadow-2xl p-8 cursor-pointer transition-all border-2 overflow-hidden ${
              selectedOption === 'quiz' 
                ? 'border-purple-500 shadow-purple-500/50' 
                : 'border-white/10 hover:border-purple-500/50'
            }`}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-50"></div>
            
            <div className="relative z-10">
              <div className={`w-20 h-20 rounded-sm flex items-center justify-center mb-6 transition-all ${
                selectedOption === 'quiz' 
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50' 
                  : 'bg-white/10 border-2 border-white/20'
              }`}>
                <FileText className={`w-10 h-10 ${
                  selectedOption === 'quiz' ? 'text-white' : 'text-purple-400'
                }`} />
              </div>

              <h3 className="text-3xl font-black text-white mb-4">
                TAKE INTERACTIVE QUIZ
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Answer 10 quick questions about your interests, skills, and career goals
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-base text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span>10 questions to complete</span>
                </div>
                <div className="flex items-center gap-3 text-base text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span>92% accuracy in career matching</span>
                </div>
                <div className="flex items-center gap-3 text-base text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span>Best for students & freshers</span>
                </div>
              </div>

              {selectedOption === 'quiz' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-sm p-4 text-center border-2 border-purple-400"
                >
                  <span className="text-white font-black text-lg uppercase tracking-wider">✓ Selected</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Dashboard Option - Ultra Premium */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedOption('dashboard')}
            className={`relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-sm shadow-2xl p-8 cursor-pointer transition-all overflow-hidden border-2 ${
              selectedOption === 'dashboard' 
                ? 'border-yellow-400 shadow-yellow-500/50' 
                : 'border-purple-500/30 hover:border-yellow-400/50'
            }`}
          >
            {/* Animated Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
            <motion.div
              className="absolute -top-10 -right-10 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <div className={`w-20 h-20 rounded-sm flex items-center justify-center mb-6 transition-all ${
                selectedOption === 'dashboard' 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-500'
              }`}>
                <LayoutDashboard className={`w-10 h-10 ${
                  selectedOption === 'dashboard' ? 'text-slate-900' : 'text-white'
                }`} />
              </div>

              <h3 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                EXPLORE DASHBOARD
                <motion.span
                  className="text-2xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  ✨
                </motion.span>
              </h3>
              <p className="text-purple-200 text-lg mb-8 leading-relaxed">
                Jump directly to your personalized dashboard and explore all features
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-base text-purple-100">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span>Access all career paths</span>
                </div>
                <div className="flex items-center gap-3 text-base text-purple-100">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span>View learning roadmaps</span>
                </div>
                <div className="flex items-center gap-3 text-base text-purple-100">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span>Best for exploration</span>
                </div>
              </div>

              {selectedOption === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-sm p-4 text-center border-2 border-yellow-300"
                >
                  <span className="text-slate-900 font-black text-lg uppercase tracking-wider">✓ Selected</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl p-10 mb-12"
        >
          <h3 className="text-3xl font-black text-white mb-10 text-center">
            WHAT HAPPENS NEXT?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-xl text-white mb-3">AI ANALYSIS</h4>
              <p className="text-gray-400 leading-relaxed">
                Our AI processes your data against 10,000+ careers
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-xl text-white mb-3">TOP 5 MATCHES</h4>
              <p className="text-gray-400 leading-relaxed">
                Get personalized career recommendations with match scores
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-black text-xl text-white mb-3">CUSTOM ROADMAP</h4>
              <p className="text-gray-400 leading-relaxed">
                6-month learning path tailored to your goals
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="px-10 py-4 border-2 border-white/20 rounded-sm font-black text-white hover:border-white hover:bg-white/10 transition-all text-lg uppercase tracking-wider"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
          <motion.button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`px-12 py-4 rounded-sm font-black text-lg uppercase tracking-wider flex items-center gap-3 transition-all ${
              selectedOption
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/50 hover:shadow-xl'
                : 'bg-white/10 text-gray-500 cursor-not-allowed border-2 border-white/10'
            }`}
            whileHover={selectedOption ? { scale: 1.05, y: -2 } : {}}
            whileTap={selectedOption ? { scale: 0.95 } : {}}
          >
            Continue
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Help Text */}
        <motion.p 
          className="text-center text-gray-500 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Need help? Call us at{' '}
          <a href="tel:+917982659056" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
            +91 7982659056
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default QuizIntro;
