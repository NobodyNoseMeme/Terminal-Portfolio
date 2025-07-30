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
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'Responsive Design'],
      level: 95,
      details: 'Crafting beautiful, responsive user interfaces with modern frameworks and clean, semantic code.'
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: ['PHP', 'Node.js', 'Express.js', 'RESTful APIs'],
      level: 90,
      details: 'Building robust server-side applications with efficient APIs and scalable architecture.'
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      skills: ['MySQL', 'MongoDB'],
      level: 85,
      details: 'Designing efficient database schemas and optimizing queries for performance.'
    },
    {
      category: 'Programming',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      skills: ['C', 'C++', 'JavaScript', 'Python'],
      level: 88,
      details: 'Strong foundation in multiple programming languages with focus on clean, efficient code.'
    },
    {
      category: 'Tools & DevOps',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      skills: ['Git & GitHub', 'VS Code', 'Postman', 'Version Control'],
      level: 85,
      details: 'Streamlining development workflow with modern tools and collaborative practices.'
    },
    {
      category: 'Specializations',
      icon: Zap,
      color: 'from-indigo-500 to-purple-500',
      skills: ['Machine Learning', 'SEO & Optimization', 'Agile Methodology', 'Debugging & Testing'],
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
            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
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
                      <div className="flex items-center mt-1">
                        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skillCategory.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skillCategory.level}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                          />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                          {skillCategory.level}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.1) }}
                        className="flex items-center"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillCategory.color} mr-3`}
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Collapse/Expand Controls */}
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
          
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCollapsed ? (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Expand Skills
              </>
            ) : (
              <>
                <Minus className="w-5 h-5 mr-2" />
                Minimize Skills
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSkills;
