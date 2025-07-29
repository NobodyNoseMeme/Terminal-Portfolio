import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Globe, Wrench, Terminal, Zap, ArrowRight, Star } from 'lucide-react';

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Front-End',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Building beautiful, responsive user interfaces',
      skills: [
        { name: 'HTML5', level: 95, experience: '3+ years', projects: 20 },
        { name: 'CSS3', level: 90, experience: '3+ years', projects: 18 },
        { name: 'Bootstrap', level: 85, experience: '2+ years', projects: 15 },
        { name: 'Tailwind CSS', level: 92, experience: '2+ years', projects: 12 },
        { name: 'JavaScript', level: 88, experience: '2+ years', projects: 16 },
      ]
    },
    {
      id: 'backend',
      title: 'Back-End',
      icon: <Code className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Server-side development and API design',
      skills: [
        { name: 'PHP', level: 85, experience: '2+ years', projects: 10 },
        { name: 'Node.js', level: 80, experience: '1+ year', projects: 8 },
        { name: 'Express.js', level: 78, experience: '1+ year', projects: 6 },
        { name: 'RESTful APIs', level: 85, experience: '2+ years', projects: 12 },
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: <Database className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Data storage and management solutions',
      skills: [
        { name: 'MySQL', level: 88, experience: '2+ years', projects: 14 },
        { name: 'MongoDB', level: 82, experience: '1+ year', projects: 8 },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      description: 'Development tools and workflows',
      skills: [
        { name: 'Git & GitHub', level: 90, experience: '2+ years', projects: 25 },
        { name: 'Postman', level: 85, experience: '2+ years', projects: 15 },
        { name: 'VS Code', level: 95, experience: '3+ years', projects: 30 },
        { name: 'SEO', level: 88, experience: '2+ years', projects: 10 },
      ]
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: <Terminal className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      description: 'Core programming languages and concepts',
      skills: [
        { name: 'C', level: 80, experience: '2+ years', projects: 5 },
        { name: 'C++', level: 82, experience: '2+ years', projects: 6 },
        { name: 'JavaScript', level: 88, experience: '2+ years', projects: 16 },
        { name: 'Python', level: 75, experience: '1+ year', projects: 4 },
      ]
    },
    {
      id: 'specialties',
      title: 'Specialties',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Special skills and methodologies',
      skills: [
        { name: 'Debugging', level: 90, experience: '2+ years', projects: 20 },
        { name: 'Agile', level: 85, experience: '1+ year', projects: 8 },
        { name: 'Machine Learning', level: 65, experience: '6 months', projects: 3 },
        { name: 'Problem Solving', level: 92, experience: '3+ years', projects: 25 },
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
            
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="relative h-80 sm:h-96 perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleCardFlip(category.id)}
                  whileHover={{ scale: 1.02 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 backface-hidden border border-gray-200 dark:border-gray-700"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 shadow-lg`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                          {category.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Click to view details
                        </p>
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
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{
                                duration: 1.5,
                                delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                ease: "easeOut",
                              }}
                            />
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

                    <div className="absolute bottom-4 right-4">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 rotate-y-180 backface-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 shadow-lg`}>
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                          Detailed View
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Skills & Experience
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                              {skill.name}
                            </h4>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <div>
                              <span className="font-medium">Experience:</span>
                              <br />
                              {skill.experience}
                            </div>
                            <div>
                              <span className="font-medium">Projects:</span>
                              <br />
                              {skill.projects}+
                            </div>
                          </div>
                          <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <ArrowRight className="w-4 h-4 text-gray-400 rotate-180" />
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
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
