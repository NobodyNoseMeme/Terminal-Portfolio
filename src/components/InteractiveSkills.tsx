import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Server, Palette, Brain, Zap, Minus, Plus, RotateCcw } from 'lucide-react';

const InteractiveSkills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML5', percentage: 98 },
        { name: 'CSS3', percentage: 95 },
        { name: 'JavaScript', percentage: 92 },
        { name: 'Bootstrap', percentage: 90 },
        { name: 'Tailwind CSS', percentage: 88 },
        { name: 'Responsive Design', percentage: 94 }
      ],
      level: 95,
      details: 'Crafting beautiful, responsive user interfaces with modern frameworks and clean, semantic code.'
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'PHP', percentage: 92 },
        { name: 'Node.js', percentage: 88 },
        { name: 'Express.js', percentage: 85 },
        { name: 'RESTful APIs', percentage: 90 }
      ],
      level: 90,
      details: 'Building robust server-side applications with efficient APIs and scalable architecture.'
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'MySQL', percentage: 88 },
        { name: 'MongoDB', percentage: 82 }
      ],
      level: 85,
      details: 'Designing efficient database schemas and optimizing queries for performance.'
    },
    {
      category: 'Programming',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'C', percentage: 85 },
        { name: 'C++', percentage: 88 },
        { name: 'JavaScript', percentage: 92 },
        { name: 'Python', percentage: 86 }
      ],
      level: 88,
      details: 'Strong foundation in multiple programming languages with focus on clean, efficient code.'
    },
    {
      category: 'Tools & DevOps',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git & GitHub', percentage: 90 },
        { name: 'VS Code', percentage: 95 },
        { name: 'Postman', percentage: 85 },
        { name: 'Version Control', percentage: 88 }
      ],
      level: 85,
      details: 'Streamlining development workflow with modern tools and collaborative practices.'
    },
    {
      category: 'Specializations',
      icon: Zap,
      color: 'from-indigo-500 to-purple-500',
      skills: [
        { name: 'Machine Learning', percentage: 75 },
        { name: 'SEO & Optimization', percentage: 82 },
        { name: 'Agile Methodology', percentage: 85 },
        { name: 'Debugging & Testing', percentage: 88 }
      ],
      level: 80,
      details: 'Exploring cutting-edge technologies and implementing best practices in development.'
    }
  ];

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks for building exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          animate={{ 
            height: isCollapsed ? 0 : 'auto',
            opacity: isCollapsed ? 0 : 1,
            marginBottom: isCollapsed ? 0 : '4rem'
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {skills.map((skillCategory, index) => {
            const IconComponent = skillCategory.icon;
            const isFlipped = flippedCards.has(index);
            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative perspective-1000"
                style={{ height: '320px' }}
              >
                <motion.div
                  className="relative w-full h-full cursor-pointer preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onClick={() => handleCardFlip(index)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 backface-hidden bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Header */}
                    <div className="flex items-center mb-6">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skillCategory.color} flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          {skillCategory.category}
                        </h3>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-3 mb-6">
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.1) }}
                          className="flex items-center"
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillCategory.color} mr-3`}
                          />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Click to flip indicator */}
                    <div className="absolute bottom-4 right-4 text-gray-400 dark:text-gray-500">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Back Face - Individual Skill Percentages */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 overflow-y-auto"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-center mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${skillCategory.color} flex items-center justify-center mx-auto mb-2`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {skillCategory.category}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Skill Breakdown
                      </p>
                    </div>

                    {/* Individual Skill Percentages */}
                    <div className="space-y-3">
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                          className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {skill.name}
                            </span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                              {skill.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skillCategory.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1, delay: skillIndex * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Overall: {skillCategory.level}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Simple Skills Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Brain className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Always Learning</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Zap className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Execution</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Click on any skill card to see detailed information and proficiency level
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSkills;
