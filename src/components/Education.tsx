import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const education = [
    {
      degree: 'BS Software Engineering',
      institution: 'University of Central Punjab',
      period: '2022 - 2026',
      location: 'Lahore, Pakistan',
      cgpa: '3.6/4.0',
      status: 'In Progress',
      description: 'Comprehensive program covering software development lifecycle, data structures, algorithms, web technologies, and project management.',
      highlights: [
        'Data Structures & Algorithms',
        'Web Development (Full-Stack)',
        'Software Engineering Principles',
        'Database Management Systems',
        'Object-Oriented Programming',
        'Machine Learning Basics',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      degree: 'FSc Pre-Engineering',
      institution: 'Govt. College of Science Lahore',
      period: '2019 - 2021',
      location: 'Lahore, Pakistan',
      cgpa: 'First Division',
      status: 'Completed',
      description: 'Strong foundation in mathematics, physics, and chemistry that provided analytical thinking skills essential for software engineering.',
      highlights: [
        'Advanced Mathematics',
        'Physics & Applied Sciences',
        'Analytical Problem Solving',
        'Scientific Research Methods',
        'Laboratory Work',
        'Technical Documentation',
      ],
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Educational <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Academic foundation that shaped my analytical thinking and technical expertise in software engineering.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-600 rounded-full z-10"></div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${edu.color} text-white`}>
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        edu.status === 'In Progress' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}>
                        {edu.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                      {edu.institution}
                    </h4>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {edu.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {edu.location}
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        {edu.cgpa}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {edu.description}
                    </p>

                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        Key Areas of Study:
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {edu.highlights.map((highlight, highlightIndex) => (
                          <motion.div
                            key={highlight}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.3 + highlightIndex * 0.1 }}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                            {highlight}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Continuous Learning Philosophy
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Beyond formal education, I believe in lifelong learning through online courses, 
              workshops, and hands-on projects to stay current with evolving technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                Online Certifications
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                Tech Workshops
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                Industry Conferences
              </span>
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                Personal Projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;