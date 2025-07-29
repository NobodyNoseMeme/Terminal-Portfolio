import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Wrench, Terminal, Zap, Star, Trophy, Target } from 'lucide-react';

const InteractiveSkills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<number>>(new Set());

  const toggleCategory = (index: number) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(index)) {
      newCollapsed.delete(index);
    } else {
      newCollapsed.add(index);
    }
    setCollapsedCategories(newCollapsed);
  };

  const skillCategories = [
    {
      title: 'Front-End',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      skills: [
        { name: 'HTML5', level: 95, experience: '3+ years', projects: 15 },
        { name: 'CSS3', level: 90, experience: '3+ years', projects: 15 },
        { name: 'Bootstrap', level: 85, experience: '2+ years', projects: 10 },
        { name: 'Tailwind CSS', level: 92, experience: '2+ years', projects: 8 },
        { name: 'JavaScript', level: 88, experience: '2+ years', projects: 12 },
      ]
    },
    {
      title: 'Back-End',
      icon: <Code className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      skills: [
        { name: 'PHP', level: 85, experience: '2+ years', projects: 8 },
        { name: 'Node.js', level: 80, experience: '1+ years', projects: 6 },
        { name: 'Express.js', level: 78, experience: '1+ years', projects: 5 },
        { name: 'RESTful APIs', level: 85, experience: '2+ years', projects: 10 },
      ]
    },
    {
      title: 'Databases',
      icon: <Database className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      skills: [
        { name: 'MySQL', level: 88, experience: '2+ years', projects: 12 },
        { name: 'MongoDB', level: 82, experience: '1+ years', projects: 6 },
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      skills: [
        { name: 'Git & GitHub', level: 90, experience: '2+ years', projects: 20 },
        { name: 'Postman', level: 85, experience: '2+ years', projects: 15 },
        { name: 'VS Code', level: 95, experience: '3+ years', projects: 25 },
        { name: 'SEO', level: 88, experience: '1+ years', projects: 8 },
      ]
    },
    {
      title: 'Programming Languages',
      icon: <Terminal className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      skills: [
        { name: 'C', level: 80, experience: '2+ years', projects: 5 },
        { name: 'C++', level: 82, experience: '2+ years', projects: 6 },
        { name: 'JavaScript', level: 88, experience: '2+ years', projects: 12 },
        { name: 'Python', level: 75, experience: '1+ years', projects: 4 },
      ]
    },
    {
      title: 'Specialties',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      skills: [
        { name: 'Debugging', level: 90, experience: '2+ years', projects: 20 },
        { name: 'Agile', level: 85, experience: '1+ years', projects: 8 },
        { name: 'Machine Learning', level: 65, experience: '6 months', projects: 2 },
        { name: 'Problem Solving', level: 92, experience: '3+ years', projects: 25 },
      ]
    },
  ];

  const getSkillIcon = (level: number) => {
    if (level >= 90) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (level >= 80) return <Star className="w-4 h-4 text-blue-500" />;
    return <Target className="w-4 h-4 text-green-500" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              ⚡
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive showcase of my technical expertise. Click on any category to explore detailed skill breakdowns!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                selectedCategory === categoryIndex ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
              onClick={() => toggleCategory(categoryIndex)}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${category.bgColor} rounded-2xl opacity-20`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                    {category.icon}
                  </div>
                  <motion.div
                    animate={{ rotate: collapsedCategories.has(categoryIndex) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 text-xl"
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-500 cursor-pointer ${
                    {collapsedCategories.has(categoryIndex) ? '▲' : '▼'}
                } ${collapsedCategories.has(categoryIndex) ? 'p-4' : 'p-8'}`}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                <div className={`absolute inset-0 ${category.bgColor} rounded-2xl opacity-20 ${collapsedCategories.has(categoryIndex) ? 'hidden' : ''}`}></div>
                </h3>

                  <div className={`flex items-center justify-between ${collapsedCategories.has(categoryIndex) ? 'mb-0' : 'mb-6'}`}>
                  {!collapsedCategories.has(categoryIndex) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {getSkillIcon(skill.level)}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Always show skill details */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 mt-2">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>Experience: {skill.experience}</span>
                          <span>Projects: {skill.projects}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{category.skills.length} Skills</span>
                    <span>
                      Avg: {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                    </span>
                  </div>
                </div>
                  <h3 className={`text-2xl font-bold text-gray-800 dark:text-gray-100 ${collapsedCategories.has(categoryIndex) ? 'mb-0' : 'mb-6'}`}>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4"
        >
          {[
            { label: 'Total Skills', value: '25+', icon: '🎯' },
            { label: 'Years Experience', value: '5+', icon: '⏱️' },
            { label: 'Projects Built', value: '20+', icon: '🚀' },
            { label: 'Technologies', value: '10+', icon: '⚡' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-3 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <div className="text-xl md:text-3xl mb-2">{stat.icon}</div>
              <div className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Always learning and staying up-to-date with the latest technologies and best practices.
          </p>
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold"
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Ready to Innovate
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSkills;