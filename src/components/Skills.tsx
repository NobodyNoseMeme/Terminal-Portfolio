import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Globe, Wrench, Terminal, Zap, ArrowRight, Star, TrendingUp, Award, Clock } from 'lucide-react';

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Front-End',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'Building beautiful, responsive user interfaces',
      totalProjects: 20,
      avgRating: 4.8,
      skills: [
        { name: 'HTML5', level: 95, experience: '3+ years', projects: 20, certification: 'Advanced' },
        { name: 'CSS3', level: 90, experience: '3+ years', projects: 18, certification: 'Advanced' },
        { name: 'Bootstrap', level: 85, experience: '2+ years', projects: 15, certification: 'Intermediate' },
        { name: 'Tailwind CSS', level: 92, experience: '2+ years', projects: 12, certification: 'Advanced' },
        { name: 'JavaScript', level: 88, experience: '2+ years', projects: 16, certification: 'Advanced' },
      ]
    },
    {
      id: 'backend',
      title: 'Back-End',
      icon: <Code className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      description: 'Server-side development and API design',
      totalProjects: 12,
      avgRating: 4.6,
      skills: [
        { name: 'PHP', level: 85, experience: '2+ years', projects: 10, certification: 'Intermediate' },
        { name: 'Node.js', level: 80, experience: '1+ year', projects: 8, certification: 'Intermediate' },
        { name: 'Express.js', level: 78, experience: '1+ year', projects: 6, certification: 'Intermediate' },
        { name: 'RESTful APIs', level: 85, experience: '2+ years', projects: 12, certification: 'Advanced' },
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: <Database className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      description: 'Data storage and management solutions',
      totalProjects: 14,
      avgRating: 4.7,
      skills: [
        { name: 'MySQL', level: 88, experience: '2+ years', projects: 14, certification: 'Advanced' },
        { name: 'MongoDB', level: 82, experience: '1+ year', projects: 8, certification: 'Intermediate' },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      description: 'Development tools and workflows',
      totalProjects: 25,
      avgRating: 4.9,
      skills: [
        { name: 'Git & GitHub', level: 90, experience: '2+ years', projects: 25, certification: 'Advanced' },
        { name: 'Postman', level: 85, experience: '2+ years', projects: 15, certification: 'Intermediate' },
        { name: 'VS Code', level: 95, experience: '3+ years', projects: 30, certification: 'Expert' },
        { name: 'SEO', level: 88, experience: '2+ years', projects: 10, certification: 'Advanced' },
      ]
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: <Terminal className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      description: 'Core programming languages and concepts',
      totalProjects: 16,
      avgRating: 4.5,
      skills: [
        { name: 'C', level: 80, experience: '2+ years', projects: 5, certification: 'Intermediate' },
        { name: 'C++', level: 82, experience: '2+ years', projects: 6, certification: 'Intermediate' },
        { name: 'JavaScript', level: 88, experience: '2+ years', projects: 16, certification: 'Advanced' },
        { name: 'Python', level: 75, experience: '1+ year', projects: 4, certification: 'Beginner' },
      ]
    },
    {
      id: 'specialties',
      title: 'Specialties',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      description: 'Special skills and methodologies',
      totalProjects: 25,
      avgRating: 4.8,
      skills: [
        { name: 'Debugging', level: 90, experience: '2+ years', projects: 20, certification: 'Advanced' },
        { name: 'Agile', level: 85, experience: '1+ year', projects: 8, certification: 'Intermediate' },
        { name: 'Machine Learning', level: 65, experience: '6 months', projects: 3, certification: 'Beginner' },
        { name: 'Problem Solving', level: 92, experience: '3+ years', projects: 25, certification: 'Expert' },
      ]
    },
  ];

  const toggleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            A comprehensive toolkit of modern technologies and frameworks that I use to build exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {skillCategories.map((category, categoryIndex) => {
            const isFlipped = flippedCards.has(category.id);
            const isHovered = hoveredCard === category.id;
            
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="relative h-80 sm:h-96 perspective-1000 group"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleCardFlip(category.id)}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    rotateX: isFlipped ? 0 : 2,
                    rotateY: isFlipped ? 180 : -2
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div 
                    className={`absolute inset-0 w-full h-full ${category.bgColor} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 backface-hidden border border-gray-200 dark:border-gray-700 ${
                      isHovered ? 'shadow-2xl border-blue-300 dark:border-blue-600' : ''
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          {category.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                            {category.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(category.avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {category.avgRating}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                        {category.description}
                      </p>

                      <div className="space-y-3 sm:space-y-4">
                        {category.skills.slice(0, 3).map((skill, skillIndex) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                {skill.name}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                transition={{
                                  duration: 1.5,
                                  delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                  ease: "easeOut",
                                }}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-white/30 rounded-full"
                                  animate={{ x: [-100, 200] }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: 'linear',
                                    delay: categoryIndex * 0.3
                                  }}
                                />
                              </motion.div>
                            </div>
                          </div>
                        ))}
                        
                        {category.skills.length > 3 && (
                          <div className="text-center mt-4">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{category.skills.length - 3} more skills
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Click to flip</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div 
                    className={`absolute inset-0 w-full h-full ${category.bgColor} rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 rotate-y-180 backface-hidden overflow-y-auto`}
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 shadow-lg`}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                          {category.title} Details
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {category.totalProjects} Projects
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {category.avgRating}/5 Rating
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                      {category.skills.map((skill) => (
                        <motion.div 
                          key={skill.name} 
                          className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 backdrop-blur-sm border border-gray-200 dark:border-gray-600"
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                              {skill.name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                {skill.level}%
                              </span>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                skill.certification === 'Expert' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                skill.certification === 'Advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                skill.certification === 'Intermediate' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}>
                                {skill.certification}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span className="font-medium">Experience:</span>
                            </div>
                            <span>{skill.experience}</span>
                            
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span className="font-medium">Projects:</span>
                            </div>
                            <span>{skill.projects}+ completed</span>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Click to flip back</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            Always learning and staying up-to-date with the latest technologies and best practices.
          </p>
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Ready to Innovate
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
