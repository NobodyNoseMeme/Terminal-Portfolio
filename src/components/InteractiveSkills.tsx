import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Server, Palette, Brain, Zap } from 'lucide-react';

const InteractiveSkills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
      level: 95
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'FastAPI'],
      level: 90
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
      level: 85
    },
    {
      category: 'Mobile',
      icon: Smartphone,
      color: 'from-pink-500 to-rose-500',
      skills: ['React Native', 'Flutter', 'Ionic', 'Expo'],
      level: 80
    },
    {
      category: 'DevOps',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      skills: ['Docker', 'AWS', 'Vercel', 'Netlify', 'CI/CD'],
      level: 75
    },
    {
      category: 'Design',
      icon: Palette,
      color: 'from-indigo-500 to-purple-500',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX Design'],
      level: 88
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => {
            const IconComponent = skillCategory.icon;
            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(skillCategory.category)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
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
                        <motion.div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillCategory.color} mr-3`}
                          animate={{
                            scale: hoveredSkill === skillCategory.category ? [1, 1.5, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <Brain className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Always Learning</span>
            </motion.div>
            <motion.div
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Execution</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSkills;
