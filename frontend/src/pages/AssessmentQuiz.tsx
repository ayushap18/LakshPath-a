import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'rating' | 'text';
  options?: string[];
  category: string;
}

const AssessmentQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "What is your current education level?",
      type: "multiple-choice",
      options: ["10th Grade", "12th Grade", "Undergraduate", "Graduate", "Postgraduate"],
      category: "demographics"
    },
    {
      id: 2,
      text: "Which field interests you the most?",
      type: "multiple-choice",
      options: ["Technology & Software", "Healthcare & Medicine", "Business & Finance", "Arts & Design", "Engineering", "Science & Research"],
      category: "interests"
    },
    {
      id: 3,
      text: "How would you rate your technical/programming skills?",
      type: "rating",
      category: "skills"
    },
    {
      id: 4,
      text: "How would you rate your communication & interpersonal skills?",
      type: "rating",
      category: "skills"
    },
    {
      id: 5,
      text: "What motivates you the most in your career?",
      type: "multiple-choice",
      options: ["High Salary & Benefits", "Job Satisfaction & Purpose", "Work-Life Balance", "Career Growth & Learning", "Social Impact & Change"],
      category: "preferences"
    },
    {
      id: 6,
      text: "What type of work environment do you prefer?",
      type: "multiple-choice",
      options: ["Remote (Work from anywhere)", "Office-based (Traditional)", "Hybrid (Mix of both)", "Fieldwork (On-site)", "Flexible (Varies by project)"],
      category: "preferences"
    },
    {
      id: 7,
      text: "How would you rate your analytical & problem-solving abilities?",
      type: "rating",
      category: "skills"
    },
    {
      id: 8,
      text: "Do you prefer working independently or in teams?",
      type: "multiple-choice",
      options: ["Independently (Solo projects)", "In Teams (Collaborative)", "Both Equally (Adaptable)"],
      category: "preferences"
    },
    {
      id: 9,
      text: "How would you rate your creativity & innovation skills?",
      type: "rating",
      category: "skills"
    },
    {
      id: 10,
      text: "What is your expected salary range after 2 years?",
      type: "multiple-choice",
      options: ["3-5 LPA", "5-8 LPA", "8-12 LPA", "12-20 LPA", "20+ LPA"],
      category: "expectations"
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  
  // Category-based progress tracking
  const getCategoryProgress = () => {
    const categories = {
      demographics: { total: 0, answered: 0, color: 'blue' },
      interests: { total: 0, answered: 0, color: 'purple' },
      skills: { total: 0, answered: 0, color: 'green' },
      preferences: { total: 0, answered: 0, color: 'orange' },
      expectations: { total: 0, answered: 0, color: 'pink' }
    };
    
    questions.forEach((q) => {
      if (categories[q.category as keyof typeof categories]) {
        categories[q.category as keyof typeof categories].total++;
        if (answers[q.id] !== undefined) {
          categories[q.category as keyof typeof categories].answered++;
        }
      }
    });
    
    return categories;
  };
  
  const categoryProgress = getCategoryProgress();

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate AI-powered results based on answers
      const mockResults = generateAssessmentResults(answers);
      
      // Save results to localStorage for persistence
      localStorage.setItem('assessmentResults', JSON.stringify(mockResults));
      localStorage.setItem('assessmentCompleted', 'true');
      localStorage.setItem('assessmentDate', new Date().toISOString());
      
      // Navigate to dashboard with results
      navigate('/dashboard', { state: { assessmentResults: mockResults } });
    } catch (error) {
      console.error('Error processing assessment:', error);
      alert('Failed to process assessment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Enhanced AI-powered result generation with intelligent matching
  const generateAssessmentResults = (userAnswers: Record<number, any>) => {
    // Extract key information from answers
    const educationLevel = userAnswers[1] || "Undergraduate";
    const fieldInterest = userAnswers[2] || "Technology & Software";
    const technicalSkill = userAnswers[3] || 3;
    const communicationSkill = userAnswers[4] || 3;
    const motivation = userAnswers[5] || "Career Growth & Learning";
    const workEnvironment = userAnswers[6] || "Hybrid (Mix of both)";
    const analyticalSkill = userAnswers[7] || 3;
    const workStyle = userAnswers[8] || "Both Equally (Adaptable)";
    const creativitySkill = userAnswers[9] || 3;
    const salaryExpectation = userAnswers[10] || "8-12 LPA";

    // Calculate aggregate skill scores
    const avgSkillScore = (technicalSkill + communicationSkill + analyticalSkill + creativitySkill) / 4;
    
    // Intelligent career matching based on multiple factors
    const careerDatabase = [
      {
        title: "Software Engineer",
        field: "Technology & Software",
        minTechnical: 3,
        minCommunication: 2,
        minAnalytical: 3,
        minCreativity: 2,
        matchScore: 0,
        description: "Design, develop and maintain software applications",
        avg_salary: "₹8-15 LPA",
        growth_rate: "+25% YoY",
        key_skills: ["Python/Java", "DSA", "System Design", "Git"],
        requiresHigh: ["technical", "analytical"]
      },
      {
        title: "Data Scientist",
        field: "Technology & Software",
        minTechnical: 4,
        minCommunication: 3,
        minAnalytical: 4,
        minCreativity: 3,
        matchScore: 0,
        description: "Analyze complex data to drive business insights",
        avg_salary: "₹10-20 LPA",
        growth_rate: "+30% YoY",
        key_skills: ["Python", "ML/AI", "Statistics", "SQL"],
        requiresHigh: ["analytical", "technical"]
      },
      {
        title: "Product Manager",
        field: "Business & Finance",
        minTechnical: 2,
        minCommunication: 5,
        minAnalytical: 4,
        minCreativity: 4,
        matchScore: 0,
        description: "Lead product strategy and development",
        avg_salary: "₹12-25 LPA",
        growth_rate: "+28% YoY",
        key_skills: ["Product Strategy", "User Research", "Agile", "Analytics"],
        requiresHigh: ["communication", "analytical", "creativity"]
      },
      {
        title: "UX/UI Designer",
        field: "Arts & Design",
        minTechnical: 2,
        minCommunication: 4,
        minAnalytical: 3,
        minCreativity: 5,
        matchScore: 0,
        description: "Design intuitive and beautiful user experiences",
        avg_salary: "₹6-12 LPA",
        growth_rate: "+22% YoY",
        key_skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
        requiresHigh: ["creativity", "communication"]
      },
      {
        title: "Business Analyst",
        field: "Business & Finance",
        minTechnical: 2,
        minCommunication: 4,
        minAnalytical: 5,
        minCreativity: 2,
        matchScore: 0,
        description: "Bridge business needs with technical solutions",
        avg_salary: "₹7-14 LPA",
        growth_rate: "+20% YoY",
        key_skills: ["SQL", "Excel", "Power BI", "Business Strategy"],
        requiresHigh: ["analytical", "communication"]
      },
      {
        title: "Healthcare Professional",
        field: "Healthcare & Medicine",
        minTechnical: 2,
        minCommunication: 5,
        minAnalytical: 3,
        minCreativity: 2,
        matchScore: 0,
        description: "Provide medical care and health services",
        avg_salary: "₹6-15 LPA",
        growth_rate: "+18% YoY",
        key_skills: ["Medical Knowledge", "Patient Care", "Diagnostics", "Empathy"],
        requiresHigh: ["communication"]
      }
    ];

    // Calculate match scores based on user profile
    const scoredCareers = careerDatabase.map(career => {
      let score = 0;
      
      // Field interest match (40% weight)
      if (fieldInterest.includes(career.field.split(' ')[0])) {
        score += 40;
      }
      
      // Skill requirements match (60% weight total)
      const technicalMatch = Math.max(0, 1 - Math.abs(career.minTechnical - technicalSkill) / 5) * 15;
      const communicationMatch = Math.max(0, 1 - Math.abs(career.minCommunication - communicationSkill) / 5) * 15;
      const analyticalMatch = Math.max(0, 1 - Math.abs(career.minAnalytical - analyticalSkill) / 5) * 15;
      const creativityMatch = Math.max(0, 1 - Math.abs(career.minCreativity - creativitySkill) / 5) * 15;
      
      score += technicalMatch + communicationMatch + analyticalMatch + creativityMatch;
      
      // Bonus for exceeding all minimum requirements
      if (technicalSkill >= career.minTechnical && 
          communicationSkill >= career.minCommunication &&
          analyticalSkill >= career.minAnalytical &&
          creativitySkill >= career.minCreativity) {
        score += 10;
      }
      
      return { ...career, match_score: Math.round(score) };
    });

    // Sort by match score and get top 5
    const topCareers = scoredCareers
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, 5);

    // Generate personalized learning roadmap
    const topCareer = topCareers[0];
    const roadmap = {
      title: `${topCareer.title} Learning Path`,
      duration: "6 months",
      milestones: [
        {
          id: 1,
          title: "Foundation Building",
          description: `Master the fundamentals of ${topCareer.title}`,
          duration: "6 weeks",
          status: "in-progress" as const,
          resources: [
            { title: `${topCareer.key_skills[0]} Basics`, platform: "YouTube", link: "https://youtube.com" },
            { title: `Introduction to ${topCareer.field}`, platform: "Coursera", link: "https://coursera.org" }
          ]
        },
        {
          id: 2,
          title: "Core Skills Development",
          description: `Deep dive into ${topCareer.key_skills.slice(0, 2).join(" and ")}`,
          duration: "10 weeks",
          status: "pending" as const,
          resources: [
            { title: `${topCareer.key_skills[0]} Complete Course`, platform: "Udemy", link: "https://udemy.com" },
            { title: `${topCareer.key_skills[1]} Masterclass`, platform: "Coursera", link: "https://coursera.org" }
          ]
        },
        {
          id: 3,
          title: "Advanced Topics",
          description: `Learn ${topCareer.key_skills.slice(2).join(", ")} and best practices`,
          duration: "8 weeks",
          status: "pending" as const,
          resources: [
            { title: `Advanced ${topCareer.key_skills[2]}`, platform: "Udemy", link: "https://udemy.com" },
            { title: "Industry Best Practices", platform: "LinkedIn Learning", link: "https://linkedin.com/learning" }
          ]
        },
        {
          id: 4,
          title: "Real-world Projects",
          description: "Build portfolio projects and gain practical experience",
          duration: "6 weeks",
          status: "pending" as const,
          resources: [
            { title: "Capstone Project", platform: "GitHub", link: "https://github.com" },
            { title: "Industry Mentorship", platform: "LakshPath", link: "/" }
          ]
        }
      ]
    };

    // Identify skill gaps
    const skillGaps = [];
    if (technicalSkill < topCareer.minTechnical) skillGaps.push("Technical Skills");
    if (communicationSkill < topCareer.minCommunication) skillGaps.push("Communication");
    if (analyticalSkill < topCareer.minAnalytical) skillGaps.push("Analytical Thinking");
    if (creativitySkill < topCareer.minCreativity) skillGaps.push("Creative Problem Solving");
    
    if (skillGaps.length === 0) skillGaps.push("Advanced Specialization");

    return {
      career_matches: topCareers,
      learning_roadmap: roadmap,
      skill_gaps: skillGaps,
      assessment_date: new Date().toISOString(),
      user_profile: {
        education: educationLevel,
        field_of_interest: fieldInterest,
        technical_skill: technicalSkill,
        communication_skill: communicationSkill,
        analytical_skill: analyticalSkill,
        creativity_skill: creativitySkill,
        avg_skill_score: avgSkillScore.toFixed(1),
        motivation: motivation,
        work_environment: workEnvironment,
        work_style: workStyle,
        salary_expectation: salaryExpectation,
        total_answers: Object.keys(userAnswers).length
      }
    };
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        );
      
      case 'rating':
        return (
          <div className="flex justify-center space-x-4 mt-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                className={`w-16 h-16 rounded-full text-xl font-bold transition-all ${
                  answers[currentQuestion.id] === rating
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-primary-100'
                }`}
                onClick={() => handleAnswer(rating)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {rating}
              </motion.button>
            ))}
          </div>
        );
      
      case 'text':
        return (
          <textarea
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none min-h-32"
            placeholder="Type your answer here..."
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-primary-500" />
              <span className="text-2xl font-black bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                LAKSHPATH
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              Question <span className="text-primary-400">{currentStep + 1}</span> of {questions.length}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Progress Bar with Category Indicators */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Overall Progress</span>
              <span className="text-xs font-bold text-primary-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-blue-500 h-3 rounded-full shadow-lg shadow-primary-500/50"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryProgress).map(([category, data]) => {
              const colors: Record<string, string> = {
                blue: 'from-blue-500 to-cyan-500',
                purple: 'from-purple-500 to-pink-500',
                green: 'from-green-500 to-emerald-500',
                orange: 'from-orange-500 to-yellow-500',
                pink: 'from-pink-500 to-rose-500'
              };
              
              const isComplete = data.answered === data.total;
              const isCurrent = currentQuestion.category === category;
              
              return (
                <motion.div
                  key={category}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    isComplete 
                      ? `bg-gradient-to-r ${colors[data.color]} text-white shadow-lg`
                      : isCurrent
                        ? 'bg-white/20 text-white border-2 border-primary-400'
                        : 'bg-white/5 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {category} {data.answered}/{data.total}
                  {isComplete && ' ✓'}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="mb-8">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                {currentQuestion.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {currentQuestion.text}
              </h2>
            </div>

            {renderQuestion()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                whileHover={currentStep !== 0 ? { scale: 1.05 } : {}}
                whileTap={currentStep !== 0 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </motion.button>

              {currentStep === questions.length - 1 ? (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !answers[currentQuestion.id]}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitting || !answers[currentQuestion.id]
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700'
                  } text-white`}
                  whileHover={!isSubmitting && answers[currentQuestion.id] ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting && answers[currentQuestion.id] ? { scale: 0.95 } : {}}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Assessment'}</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    !answers[currentQuestion.id]
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700'
                  } text-white`}
                  whileHover={answers[currentQuestion.id] ? { scale: 1.05 } : {}}
                  whileTap={answers[currentQuestion.id] ? { scale: 0.95 } : {}}
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentQuiz;
