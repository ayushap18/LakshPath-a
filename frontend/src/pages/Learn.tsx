import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Play, 
  Star, 
  TrendingUp,
  Award,
  Target,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import axios from 'axios';

interface Course {
  id: string;
  title: string;
  platform: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolled: number;
  thumbnail: string;
  url: string;
  cost: 'free' | 'paid';
  price?: string;
  skillTag: string;
  progress?: number;
  isRecommended: boolean;
}

interface SkillProgress {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  courses: Course[];
  priority: 'high' | 'medium' | 'low';
}

const Learn = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLearningData();
  }, []);

  const fetchLearningData = async () => {
    try {
      const response = await axios.get('/api/learning/progress');
      setSkillProgress(response.data.skillProgress || mockSkillProgress);
      setRecommendedCourses(response.data.recommended || mockCourses);
    } catch (error) {
      console.error('Failed to fetch learning data:', error);
      // Use mock data
      setSkillProgress(mockSkillProgress);
      setRecommendedCourses(mockCourses);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollCourse = async (courseId: string) => {
    try {
      await axios.post('/api/learning/enroll', { courseId });
      // Refresh data
      fetchLearningData();
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Learning Journey
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Master the skills you need to achieve your career goals with AI-powered recommendations
            </p>
          </motion.div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <StatCard
              icon={<BookOpen className="w-6 h-6" />}
              value="12"
              label="Courses Enrolled"
              color="bg-blue-500"
            />
            <StatCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              value="8"
              label="Completed"
              color="bg-green-500"
            />
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              value="4"
              label="In Progress"
              color="bg-yellow-500"
            />
            <StatCard
              icon={<Award className="w-6 h-6" />}
              value="67%"
              label="Overall Progress"
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* 8-Step Journey Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-7 h-7 text-purple-600" />
            Your Career Roadmap Progress
          </h2>

          <div className="space-y-4">
            <JourneyStep
              stepNumber={1}
              title="SIGN UP"
              status="completed"
              description="Account created successfully"
            />
            <JourneyStep
              stepNumber={2}
              title="TAKE QUIZ or UPLOAD RESUME"
              status="completed"
              description="Assessment completed with 92% match accuracy"
            />
            <JourneyStep
              stepNumber={3}
              title="AI ANALYZES YOUR PROFILE"
              status="completed"
              description="Profile analyzed against 10,000+ careers"
            />
            <JourneyStep
              stepNumber={4}
              title="GET TOP CAREER RECOMMENDATIONS"
              status="completed"
              description="5 career matches identified"
            />
            <JourneyStep
              stepNumber={5}
              title="CHOOSE YOUR PATH"
              status="completed"
              description="Software Developer path selected"
            />
            <JourneyStep
              stepNumber={6}
              title="GET PERSONALIZED ROADMAP"
              status="completed"
              description="6-month learning roadmap generated"
            />
            <JourneyStep
              stepNumber={7}
              title="START LEARNING & TRACK PROGRESS"
              status="in-progress"
              description="4 courses in progress, 8 completed"
              progress={67}
            />
            <JourneyStep
              stepNumber={8}
              title="AI UPDATES YOUR PLAN AS MARKET CHANGES"
              status="active"
              description="Real-time updates via Pathway Framework"
            />
          </div>
        </motion.div>

        {/* Skills You're Working On */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Skills You're Improving</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:border-purple-600 hover:text-purple-600 transition">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillProgress.map((skill, index) => (
              <SkillProgressCard key={index} skill={skill} />
            ))}
          </div>
        </section>

        {/* Recommended Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Recommended for You</h2>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-6">
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All Courses
            </FilterButton>
            <FilterButton
              active={activeFilter === 'in-progress'}
              onClick={() => setActiveFilter('in-progress')}
            >
              In Progress
            </FilterButton>
            <FilterButton
              active={activeFilter === 'completed'}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </FilterButton>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses
              .filter(course => 
                searchQuery === '' || 
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.skillTag.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onEnroll={handleEnrollCourse}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Component: Journey Step
interface JourneyStepProps {
  stepNumber: number;
  title: string;
  status: 'completed' | 'in-progress' | 'active' | 'locked';
  description: string;
  progress?: number;
}

const JourneyStep = ({ stepNumber, title, status, description, progress }: JourneyStepProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'active': return 'bg-purple-600';
      case 'locked': return 'bg-gray-300';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-white" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-white animate-pulse" />;
      case 'active': return <Zap className="w-5 h-5 text-white" />;
      case 'locked': return <Lock className="w-5 h-5 text-white" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: stepNumber * 0.1 }}
      className={`flex items-start gap-4 p-4 rounded-lg ${
        status === 'in-progress' ? 'bg-yellow-50 border border-yellow-200' : 
        status === 'active' ? 'bg-purple-50 border border-purple-200' : 
        'bg-gray-50'
      }`}
    >
      {/* Step Number with Icon */}
      <div className={`${getStatusColor()} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
        {getStatusIcon()}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-sm font-semibold text-gray-500">STEP {stepNumber}</span>
          {status === 'in-progress' && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-semibold">
              IN PROGRESS
            </span>
          )}
          {status === 'active' && (
            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-semibold">
              ACTIVE
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>

        {/* Progress Bar for in-progress steps */}
        {progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Arrow for non-last steps */}
      {stepNumber < 8 && (
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-3" />
      )}
    </motion.div>
  );
};

// Component: Skill Progress Card
const SkillProgressCard = ({ skill }: { skill: SkillProgress }) => {
  const getPriorityColor = () => {
    switch (skill.priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{skill.skillName}</h3>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase ${getPriorityColor()}`}>
          {skill.priority} Priority
        </span>
      </div>

      {/* Skill Level Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current: Level {skill.currentLevel}/10</span>
          <span>Target: Level {skill.targetLevel}/10</span>
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-3">
          <div
            className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            style={{ width: `${skill.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{skill.progress}% to target level</p>
      </div>

      {/* Courses for this skill */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommended Courses:</h4>
        <div className="space-y-2">
          {skill.courses.slice(0, 2).map((course) => (
            <div key={course.id} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="text-gray-700">{course.title}</span>
              {course.cost === 'free' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">FREE</span>
              )}
            </div>
          ))}
        </div>
        <button className="mt-3 text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center gap-1">
          View all courses <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Component: Course Card
const CourseCard = ({ course, onEnroll }: { course: Course; onEnroll: (id: string) => void }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
        {course.isRecommended && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Recommended
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            course.cost === 'free' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {course.cost === 'free' ? 'FREE' : course.price}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded text-xs font-semibold">
            {course.level.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{course.platform}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{course.enrolled.toLocaleString()} enrolled</span>
          </div>
        </div>

        {/* Skill Tag */}
        <div className="mb-4">
          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            {course.skillTag}
          </span>
        </div>

        {/* Progress (if enrolled) */}
        {course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {course.progress !== undefined ? (
            <button className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Continue Learning
            </button>
          ) : (
            <>
              <button
                onClick={() => onEnroll(course.id)}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Enroll Now
              </button>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 border border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Component: Stat Card
const StatCard = ({ icon, value, label, color }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
  >
    <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
      {icon}
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-sm opacity-90">{label}</div>
  </motion.div>
);

// Component: Filter Button
const FilterButton = ({ active, onClick, children }: any) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-semibold transition ${
      active
        ? 'bg-purple-600 text-white'
        : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600 hover:text-purple-600'
    }`}
  >
    {children}
  </button>
);

// Mock Data
const mockSkillProgress: SkillProgress[] = [
  {
    skillName: 'React & Frontend Development',
    currentLevel: 6,
    targetLevel: 9,
    progress: 67,
    priority: 'high',
    courses: [
      {
        id: 'c1',
        title: 'Advanced React Patterns',
        platform: 'Udemy',
        duration: '12 hours',
        level: 'advanced',
        rating: 4.8,
        enrolled: 15420,
        thumbnail: '',
        url: '#',
        cost: 'paid',
        price: '₹499',
        skillTag: 'React',
        isRecommended: true
      }
    ]
  },
  {
    skillName: 'TypeScript',
    currentLevel: 4,
    targetLevel: 8,
    progress: 50,
    priority: 'high',
    courses: []
  },
  {
    skillName: 'Data Structures & Algorithms',
    currentLevel: 5,
    targetLevel: 9,
    progress: 56,
    priority: 'medium',
    courses: []
  },
  {
    skillName: 'System Design',
    currentLevel: 3,
    targetLevel: 7,
    progress: 43,
    priority: 'medium',
    courses: []
  }
];

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    platform: 'Udemy',
    duration: '40 hours',
    level: 'intermediate',
    rating: 4.7,
    enrolled: 45000,
    thumbnail: '',
    url: '#',
    cost: 'paid',
    price: '₹499',
    skillTag: 'React',
    progress: 45,
    isRecommended: true
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    platform: 'Frontend Masters',
    duration: '8 hours',
    level: 'beginner',
    rating: 4.9,
    enrolled: 12000,
    thumbnail: '',
    url: '#',
    cost: 'free',
    skillTag: 'TypeScript',
    isRecommended: true
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms in JavaScript',
    platform: 'Coursera',
    duration: '35 hours',
    level: 'intermediate',
    rating: 4.6,
    enrolled: 28000,
    thumbnail: '',
    url: '#',
    cost: 'paid',
    price: '₹799',
    skillTag: 'DSA',
    progress: 20,
    isRecommended: false
  },
  {
    id: '4',
    title: 'System Design Interview Preparation',
    platform: 'Educative',
    duration: '25 hours',
    level: 'advanced',
    rating: 4.8,
    enrolled: 18000,
    thumbnail: '',
    url: '#',
    cost: 'paid',
    price: '₹1299',
    skillTag: 'System Design',
    isRecommended: true
  },
  {
    id: '5',
    title: 'Full Stack Web Development Bootcamp',
    platform: 'Udemy',
    duration: '65 hours',
    level: 'beginner',
    rating: 4.5,
    enrolled: 95000,
    thumbnail: '',
    url: '#',
    cost: 'paid',
    price: '₹599',
    skillTag: 'Full Stack',
    isRecommended: false
  },
  {
    id: '6',
    title: 'Advanced CSS & Tailwind CSS',
    platform: 'YouTube',
    duration: '5 hours',
    level: 'intermediate',
    rating: 4.7,
    enrolled: 8000,
    thumbnail: '',
    url: '#',
    cost: 'free',
    skillTag: 'CSS',
    isRecommended: false
  }
];

export default Learn;
