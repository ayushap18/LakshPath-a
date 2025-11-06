import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Target, TrendingUp, BookOpen, Briefcase, Award, 
  CheckCircle, Clock, User, LogOut, LayoutDashboard, MapPin,
  Star, Calendar, MessageCircle, Zap, Trophy, Users,
  Brain, Sparkles, ArrowRight, Activity, Layers, Download,
  Share2, Bell, X, AlertCircle, Filter, Search, Heart,
  Phone, MapPinned, TrendingDown, Linkedin, FileText,
  ArrowUpRight, Gauge, UserPlus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CareerMatch {
  title: string;
  match_score: number;
  description: string;
  avg_salary: string;
  growth_rate: string;
  key_skills: string[];
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'pending';
  resources: Array<{
    title: string;
    platform: string;
    link: string;
  }>;
}

const DashboardNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Copied to clipboard!');
    }).catch(() => {
      showToast('❌ Failed to copy');
    });
  };

  // View career details
  const viewCareerDetails = (career: CareerMatch) => {
    const message = `${career.title}\n\nMatch: ${career.match_score}%\nSalary: ${career.avg_salary}\nGrowth: ${career.growth_rate}\n\nKey Skills:\n${career.key_skills.map(s => `• ${s}`).join('\n')}`;
    alert(message);
  };

  // Set reminder
  const setReminder = () => {
    showToast('🔔 Reminders set for upcoming events!');
  };

  // View all achievements
  const viewAllAchievements = () => {
    setActiveTab('community');
    showToast('🏆 Check out your achievements!');
  };

  // Connect LinkedIn
  const connectLinkedIn = () => {
    showToast('🔗 LinkedIn integration coming soon!');
  };

  // Upload Resume
  const uploadResume = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        showToast(`✅ ${file.name} uploaded! Processing...`);
        setTimeout(() => {
          showToast('🎉 Resume analyzed! Profile enhanced.');
        }, 2000);
      }
    };
    input.click();
  };

  // Join learning group
  const joinGroup = (groupName: string) => {
    showToast(`🎉 You've joined "${groupName}"!`);
  };

  // Request mentorship
  const requestMentorship = (mentorName: string) => {
    showToast(`📩 Mentorship request sent to ${mentorName}!`);
  };

  // Connect with student
  const connectWithStudent = (studentName: string) => {
    showToast(`🤝 Connection request sent to ${studentName}!`);
  };

  // Export career report
  const exportReport = () => {
    const userName = localStorage.getItem('userName') || 'Student';
    const careers = career_matches || [];
    
    let report = `LakshPath - Career Assessment Report\n`;
    report += `Student: ${userName}\n`;
    report += `Date: ${new Date().toLocaleDateString()}\n\n`;
    report += `TOP CAREER MATCHES:\n\n`;
    
    careers.forEach((career: CareerMatch, idx: number) => {
      report += `${idx + 1}. ${career.title} - ${career.match_score}% Match\n`;
      report += `   ${career.description}\n`;
      report += `   Salary: ${career.avg_salary}\n`;
      report += `   Growth: ${career.growth_rate}\n\n`;
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Career_Report_${userName}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('📄 Career report exported!');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const results = location.state?.assessmentResults || 
                    JSON.parse(localStorage.getItem('assessmentResults') || 'null');
    
    if (results) {
      setAssessmentResults(results);
    } else {
      setAssessmentResults(generateMockResults());
    }
  }, [location, navigate]);

  const generateMockResults = () => ({
    career_matches: [
      {
        title: "Software Engineer",
        match_score: 92,
        description: "Design, develop, and maintain software applications using modern programming languages and frameworks.",
        avg_salary: "₹8-15 LPA",
        growth_rate: "22% annually",
        key_skills: ["JavaScript", "React", "Node.js", "Python", "Git"]
      },
      {
        title: "Data Scientist",
        match_score: 88,
        description: "Analyze complex data sets to derive insights and build predictive models using machine learning.",
        avg_salary: "₹10-18 LPA",
        growth_rate: "28% annually",
        key_skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"]
      },
      {
        title: "Product Manager",
        match_score: 85,
        description: "Lead product strategy, development, and launch while coordinating with cross-functional teams.",
        avg_salary: "₹12-20 LPA",
        growth_rate: "18% annually",
        key_skills: ["Product Strategy", "Analytics", "Communication", "Agile", "User Research"]
      }
    ],
    learning_roadmap: {
      milestones: [
        {
          id: 1,
          title: "Foundation Building",
          description: "Master the fundamentals of programming and computer science concepts",
          duration: "2 months",
          status: "completed" as const,
          resources: [
            { title: "JavaScript Complete Guide", platform: "Udemy", link: "#" },
            { title: "CS50 - Harvard", platform: "edX", link: "#" }
          ]
        },
        {
          id: 2,
          title: "Web Development Basics",
          description: "Learn HTML, CSS, and modern JavaScript frameworks",
          duration: "3 months",
          status: "in-progress" as const,
          resources: [
            { title: "React Complete Course", platform: "Coursera", link: "#" },
            { title: "Web Dev Bootcamp", platform: "YouTube", link: "#" }
          ]
        },
        {
          id: 3,
          title: "Backend Development",
          description: "Build robust server-side applications with Node.js and databases",
          duration: "3 months",
          status: "pending" as const,
          resources: [
            { title: "Node.js Masterclass", platform: "Udemy", link: "#" },
            { title: "MongoDB University", platform: "MongoDB", link: "#" }
          ]
        }
      ]
    }
  });

  const { career_matches, learning_roadmap } = assessmentResults || {};

  const progressData = [
    { month: 'Jan', progress: 0 },
    { month: 'Feb', progress: 20 },
    { month: 'Mar', progress: 40 },
    { month: 'Apr', progress: 60 },
    { month: 'May', progress: 75 },
    { month: 'Jun', progress: 85 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'profile', label: 'Smart Profile', icon: <Brain className="w-5 h-5" /> },
    { id: 'careers', label: 'Career Matches', icon: <Target className="w-5 h-5" /> },
    { id: 'market', label: 'Live Market', icon: <Activity className="w-5 h-5" /> },
    { id: 'roadmap', label: 'Learning Path', icon: <MapPin className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" /> },
    { id: 'jobs', label: 'Job Opportunities', icon: <Briefcase className="w-5 h-5" /> },
  ];

  const achievements = [
    { id: 1, title: 'First Assessment', icon: '🎯', date: 'Today' },
    { id: 2, title: 'Profile Complete', icon: '🏆', date: '2 days ago' },
    { id: 3, title: 'Fast Learner', icon: '⚡', date: '1 week ago' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Web Development Webinar', date: 'Nov 15, 2025', time: '6:00 PM' },
    { id: 2, title: 'Career Counseling Session', date: 'Nov 18, 2025', time: '3:00 PM' },
    { id: 3, title: 'Mock Interview Practice', date: 'Nov 22, 2025', time: '5:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 z-50 bg-white text-black px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-primary-600" />
            <span className="font-bold">{notificationMessage}</span>
            <button onClick={() => setShowNotification(false)}>
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <nav className="bg-black/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-sm flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">LAKSHPATH</span>
            </motion.div>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => showToast('Profile feature coming soon!')}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm hover:bg-white/10 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                <span className="font-bold">{localStorage.getItem('userName') || 'User'}</span>
              </motion.button>
              <motion.button
                onClick={() => {
                  localStorage.clear();
                  navigate('/login');
                }}
                className="flex items-center gap-2 px-4 py-2 border border-red-500/20 text-red-500 rounded-sm hover:bg-red-500/10 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-bold">LOGOUT</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-black mb-4">
            WELCOME BACK, <span className="bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">
              {(localStorage.getItem('userName') || 'USER').toUpperCase()}
            </span>
          </h1>
          <p className="text-gray-400 text-xl">Your AI-powered career intelligence dashboard</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 rounded-sm font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'border border-white/20 text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                <span>{tab.label.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Briefcase className="w-12 h-12 text-primary-500 mb-4" />
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Career Matches</p>
                <p className="text-5xl font-black">{career_matches?.length || 0}</p>
              </motion.div>

              <motion.div
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Milestones</p>
                <p className="text-5xl font-black">{learning_roadmap?.milestones?.length || 0}</p>
              </motion.div>

              <motion.div
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Achievements</p>
                <p className="text-5xl font-black">5</p>
              </motion.div>
            </div>

            {/* Progress Chart */}
            <motion.div
              className="bg-white/5 border border-white/10 p-8 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black uppercase">Learning Progress</h3>
                <motion.button
                  onClick={() => showToast('Download feature coming soon!')}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm hover:bg-white/10 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span className="font-bold text-sm">EXPORT</span>
                </motion.button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '1px solid #333',
                      borderRadius: '4px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.button
                onClick={() => showToast('📥 Download feature coming soon!')}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition text-left group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-10 h-10 text-primary-500 mb-4 group-hover:scale-110 transition" />
                <p className="text-xl font-black uppercase mb-2">Download Roadmap</p>
                <p className="text-gray-400 text-sm">Export your learning path as PDF</p>
              </motion.button>

              <motion.button
                onClick={() => showToast('🔗 Share feature coming soon!')}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition text-left group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition" />
                <p className="text-xl font-black uppercase mb-2">Share Progress</p>
                <p className="text-gray-400 text-sm">Show your achievements</p>
              </motion.button>

              <motion.button
                onClick={() => showToast('🤖 AI Mentor launching soon!')}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition text-left group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-10 h-10 text-green-500 mb-4 group-hover:scale-110 transition" />
                <p className="text-xl font-black uppercase mb-2">Ask AI Mentor</p>
                <p className="text-gray-400 text-sm">24/7 career guidance</p>
              </motion.button>
            </div>
          </div>
        )}

        {/* Career Matches Tab */}
        {activeTab === 'careers' && (
          <div className="space-y-8">
            {career_matches?.map((career: CareerMatch, index: number) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-4xl font-black mb-2">{career.title.toUpperCase()}</h3>
                    <p className="text-gray-400">{career.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-black text-primary-500">{career.match_score}%</div>
                    <p className="text-gray-400 text-sm uppercase">Match Score</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/50 p-4 rounded-sm border border-green-500/20">
                    <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
                    <p className="text-gray-400 text-sm uppercase mb-1">Growth Rate</p>
                    <p className="text-xl font-black">{career.growth_rate}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-sm border border-blue-500/20">
                    <Briefcase className="w-6 h-6 text-blue-500 mb-2" />
                    <p className="text-gray-400 text-sm uppercase mb-1">Average Salary</p>
                    <p className="text-xl font-black">{career.avg_salary}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm uppercase mb-3">Key Skills Required</p>
                  <div className="flex flex-wrap gap-2">
                    {career.key_skills?.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-sm font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() => navigate('/learn')}
                  className="w-full bg-white text-black py-4 rounded-sm font-black text-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  START LEARNING PATH <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Learning Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            {learning_roadmap?.milestones?.map((milestone: Milestone, index: number) => (
              <motion.div
                key={milestone.id}
                className={`bg-white/5 border rounded-sm p-8 ${
                  milestone.status === 'completed' ? 'border-green-500/50' :
                  milestone.status === 'in-progress' ? 'border-blue-500/50' :
                  'border-white/10'
                } hover:bg-white/10 transition`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-sm flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-white/10'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="w-8 h-8 text-white" />
                      ) : (
                        <BookOpen className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2">{milestone.title.toUpperCase()}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-sm text-xs font-black uppercase ${
                    milestone.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                    milestone.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-white/10 text-gray-400'
                  }`}>
                    {milestone.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {milestone.resources?.map((resource, idx) => (
                    <div key={idx} className="bg-black/50 border border-white/10 p-4 rounded-sm">
                      <p className="font-black mb-1">{resource.title}</p>
                      <p className="text-sm text-gray-400">{resource.platform}</p>
                    </div>
                  ))}
                </div>

                {milestone.status !== 'completed' && (
                  <motion.button
                    onClick={() => showToast(`Starting ${milestone.title}...`)}
                    className="w-full bg-white text-black py-4 rounded-sm font-black hover:bg-gray-200 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {milestone.status === 'in-progress' ? 'CONTINUE LEARNING' : 'START MILESTONE'}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Smart Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Profile Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Brain className="w-12 h-12 text-white mb-4" />
                <p className="text-purple-200 text-sm uppercase">AI Analysis</p>
                <p className="text-3xl font-black text-white mb-2">Complete</p>
                <p className="text-purple-200 text-sm">10,000+ career paths analyzed</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-600 to-cyan-700 p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="w-12 h-12 text-white mb-4" />
                <p className="text-blue-200 text-sm uppercase">Career DNA</p>
                <p className="text-3xl font-black text-white mb-2">Mapped</p>
                <p className="text-blue-200 text-sm">Your unique career blueprint</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <FileText className="w-12 h-12 text-white mb-4" />
                <p className="text-green-200 text-sm uppercase">Data Sources</p>
                <p className="text-3xl font-black text-white mb-2">2</p>
                <p className="text-green-200 text-sm">Quiz + Resume analysis</p>
              </motion.div>
            </div>

            {/* Career DNA Breakdown */}
            <motion.div
              className="bg-white/5 border border-white/10 p-8 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-black mb-8">YOUR CAREER DNA BREAKDOWN</h3>
              
              <div className="space-y-8">
                {/* Interests */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-red-500" />
                      <span className="text-xl font-black">INTERESTS & PASSION</span>
                    </div>
                    <span className="text-3xl font-black text-red-500">92%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-sm h-4 mb-4">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-sm" style={{width: '92%'}}></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-sm text-sm font-black uppercase">Technology</span>
                    <span className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-sm text-sm font-black uppercase">Problem Solving</span>
                    <span className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-sm text-sm font-black uppercase">Innovation</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-yellow-500" />
                      <span className="text-xl font-black">TECHNICAL SKILLS</span>
                    </div>
                    <span className="text-3xl font-black text-yellow-500">85%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-sm h-4 mb-4">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-sm" style={{width: '85%'}}></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-sm text-sm font-black uppercase">Programming</span>
                    <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-sm text-sm font-black uppercase">Analytics</span>
                    <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-sm text-sm font-black uppercase">Communication</span>
                  </div>
                </div>

                {/* Personality */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-purple-500 fill-purple-500" />
                      <span className="text-xl font-black">PERSONALITY TRAITS</span>
                    </div>
                    <span className="text-3xl font-black text-purple-500">88%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-sm h-4 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-4 rounded-sm" style={{width: '88%'}}></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-sm text-sm font-black uppercase">Analytical</span>
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-sm text-sm font-black uppercase">Detail-Oriented</span>
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-sm text-sm font-black uppercase">Collaborative</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-sm">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-8 h-8 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-black text-lg mb-2">AI INSIGHT</p>
                    <p className="text-gray-400">
                      Your profile strongly aligns with Software Engineering, Data Science, and Product Management roles. 
                      Your analytical mindset combined with technical skills makes you perfect for tech leadership paths.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* LinkedIn/Resume Integration */}
            <motion.div
              className="bg-blue-500/10 border-2 border-blue-500/30 p-8 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 p-6 rounded-sm">
                  <Linkedin className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3">ENHANCE YOUR PROFILE</h3>
                  <p className="text-gray-400 mb-6 text-lg">
                    Upload your resume or connect LinkedIn for deeper AI analysis and better career matching
                  </p>
                  <div className="flex gap-4">
                    <motion.button 
                      onClick={connectLinkedIn}
                      className="px-8 py-4 bg-blue-600 text-white rounded-sm font-black hover:bg-blue-700 transition flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-5 h-5" />
                      CONNECT LINKEDIN
                    </motion.button>
                    <motion.button 
                      onClick={uploadResume}
                      className="px-8 py-4 border-2 border-white text-white rounded-sm font-black hover:bg-white/10 transition flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-5 h-5" />
                      UPLOAD RESUME
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Live Market Tab */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black">LIVE MARKET INTELLIGENCE</h2>
                <p className="text-gray-400 text-lg mt-2">Real-time job market data & emerging trends</p>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-black text-green-500 uppercase">Live Data</span>
              </div>
            </div>

            {/* Market Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <motion.div
                className="bg-gradient-to-br from-blue-600 to-cyan-700 p-6 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <Layers className="w-10 h-10 text-white mb-3 opacity-80" />
                <p className="text-blue-200 text-sm uppercase">Data Sources</p>
                <p className="text-4xl font-black text-white mt-2">10+</p>
                <p className="text-blue-200 text-xs mt-2">Job Portals Connected</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Activity className="w-10 h-10 text-white mb-3 opacity-80" />
                <p className="text-purple-200 text-sm uppercase">Daily Job Analysis</p>
                <p className="text-4xl font-black text-white mt-2">50K+</p>
                <p className="text-purple-200 text-xs mt-2">Postings Tracked</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="w-10 h-10 text-white mb-3 opacity-80" />
                <p className="text-green-200 text-sm uppercase">Emerging Skills</p>
                <p className="text-4xl font-black text-white mt-2">247</p>
                <p className="text-green-200 text-xs mt-2">New This Month</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-red-600 to-pink-700 p-6 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <TrendingDown className="w-10 h-10 text-white mb-3 opacity-80" />
                <p className="text-red-200 text-sm uppercase">Declining Roles</p>
                <p className="text-4xl font-black text-white mt-2">12</p>
                <p className="text-red-200 text-xs mt-2">Flagged This Week</p>
              </motion.div>
            </div>

            {/* Trending Alert */}
            <motion.div
              className="bg-yellow-500/10 border-2 border-yellow-500/50 p-8 rounded-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-6">
                <div className="bg-yellow-500 p-4 rounded-sm animate-pulse">
                  <Bell className="w-8 h-8 text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-black">🔥 TRENDING ALERT</h3>
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-black rounded-sm animate-bounce">NEW</span>
                  </div>
                  <p className="text-white font-bold text-lg mb-2">
                    New skill trending in your domain - React 19 released!
                  </p>
                  <p className="text-gray-400 mb-4">
                    850+ job postings mention React 19 in the last 7 days. Companies are actively seeking developers with this skill.
                  </p>
                  <div className="flex gap-4">
                    <motion.button 
                      onClick={() => showToast('Added React 19 to learning path!')}
                      className="px-6 py-3 bg-yellow-500 text-black rounded-sm font-black hover:bg-yellow-600 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ADD TO LEARNING PATH
                    </motion.button>
                    <motion.button 
                      onClick={() => window.open('https://react.dev', '_blank')}
                      className="px-6 py-3 border-2 border-yellow-500 text-yellow-500 rounded-sm font-black hover:bg-yellow-500/10 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LEARN MORE
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Market Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Salary Trends */}
              <motion.div
                className="bg-white/5 border border-white/10 p-8 rounded-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Gauge className="w-8 h-8 text-primary-500" />
                  <h3 className="text-xl font-black">SALARY TRENDS - SOFTWARE ENGINEER</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400 uppercase text-sm">Entry Level (0-2 yrs)</span>
                      <span className="font-black text-xl">₹4-8 LPA</span>
                    </div>
                    <div className="flex gap-2 text-sm text-green-500">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold">↑ 12% from last year</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400 uppercase text-sm">Mid Level (3-5 yrs)</span>
                      <span className="font-black text-xl">₹8-15 LPA</span>
                    </div>
                    <div className="flex gap-2 text-sm text-green-500">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold">↑ 18% from last year</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400 uppercase text-sm">Senior Level (5+ yrs)</span>
                      <span className="font-black text-xl">₹15-30 LPA</span>
                    </div>
                    <div className="flex gap-2 text-sm text-green-500">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold">↑ 22% from last year</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-sm">
                  <p className="text-sm text-gray-300">
                    <span className="font-black text-blue-500">INSIGHT:</span> Remote positions offering 20-30% higher salaries
                  </p>
                </div>
              </motion.div>

              {/* Hiring Patterns */}
              <motion.div
                className="bg-white/5 border border-white/10 p-8 rounded-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <LineChart className="w-8 h-8 text-purple-500" />
                  <h3 className="text-xl font-black">HIRING PATTERNS</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-l-4 border-green-500 rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black">HIGH DEMAND</span>
                      <ArrowUpRight className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Full-Stack Development, Cloud Engineering</p>
                    <span className="px-3 py-1 bg-green-500/30 text-green-500 rounded-sm text-xs font-black">+45% JOBS</span>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-l-4 border-yellow-500 rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black">STABLE GROWTH</span>
                      <TrendingUp className="w-6 h-6 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Data Science, Product Management</p>
                    <span className="px-3 py-1 bg-yellow-500/30 text-yellow-500 rounded-sm text-xs font-black">+22% JOBS</span>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-l-4 border-red-500 rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black">DECLINING</span>
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Manual Testing, Legacy System Support</p>
                    <span className="px-3 py-1 bg-red-500/30 text-red-500 rounded-sm text-xs font-black">-18% JOBS</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black">LIVE JOB OPPORTUNITIES</h2>
              <div className="flex gap-3">
                <motion.button 
                  className="px-6 py-3 border border-white/20 rounded-sm hover:bg-white/5 transition flex items-center gap-2 font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-5 h-5" />
                  FILTER
                </motion.button>
                <motion.button 
                  className="px-6 py-3 border border-white/20 rounded-sm hover:bg-white/5 transition flex items-center gap-2 font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5" />
                  SEARCH
                </motion.button>
              </div>
            </div>

            {/* Featured Job Card */}
            <motion.div
              className="bg-gradient-to-r from-primary-500/20 to-purple-500/20 border-2 border-primary-500/50 p-8 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-sm flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-2">SOFTWARE ENGINEER</h3>
                    <p className="text-gray-400 text-lg">Tech Company • Remote</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition">
                  <Heart className="w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-500 rounded-sm font-black uppercase">
                  ₹8-12 LPA
                </span>
                <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-500 rounded-sm font-black uppercase">
                  Full Time
                </span>
                <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-500 rounded-sm font-black uppercase">
                  2-3 Years Exp
                </span>
              </div>
              <p className="text-gray-400 text-lg mb-6">
                Looking for talented software engineers to join our growing team...
              </p>
              <div className="flex gap-4">
                <motion.button 
                  className="flex-1 bg-primary-600 text-white py-4 rounded-sm font-black text-lg hover:bg-primary-700 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  APPLY NOW
                </motion.button>
                <motion.button 
                  className="px-8 border-2 border-primary-600 text-primary-600 py-4 rounded-sm font-black text-lg hover:bg-primary-600/10 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DETAILS
                </motion.button>
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              className="bg-white/5 border border-white/10 p-12 rounded-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Briefcase className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-3xl font-black mb-4">MORE JOB RECOMMENDATIONS COMING SOON</h3>
              <p className="text-gray-400 text-lg mb-8">
                We're fetching live job opportunities matched to your profile from top platforms
              </p>
              <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="font-bold text-gray-400">LINKEDIN</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="font-bold text-gray-400">NAUKRI</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="font-bold text-gray-400">INDEED</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-8">
            <motion.div
              className="bg-white/5 border border-white/10 p-12 rounded-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Users className="w-20 h-20 text-primary-500 mx-auto mb-6" />
              <h3 className="text-4xl font-black mb-4">COMMUNITY FEATURES</h3>
              <p className="text-gray-400 text-xl mb-8">
                Connect with peers, find mentors, and join learning groups
              </p>
              <motion.button
                onClick={() => showToast('🚀 Community features launching soon!')}
                className="bg-white text-black px-12 py-4 rounded-sm font-black text-lg hover:bg-gray-200 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                COMING SOON
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNew;
