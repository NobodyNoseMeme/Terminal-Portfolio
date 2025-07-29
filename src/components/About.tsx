import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Coffee, Heart, Zap, Star, Trophy } from 'lucide-react';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  
  const [counters, setCounters] = useState({
    cgpa: 0,
    projects: 0,
    experience: 0,
  });

  useEffect(() => {
    if (isInView) {
      const animateCounter = (target: number, key: keyof typeof counters, duration: number = 2000) => {
        const start = performance.now();
        const animate = (current: number) => {
          const elapsed = current - start;
          const progress = Math.min(elapsed / duration, 1);
          
          let value;
          if (key === 'cgpa') {
            value = progress * target;
          } else {
            value = Math.floor(progress * target);
          }
          
          setCounters(prev => ({ ...prev, [key]: value }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      };

      animateCounter(3.6, 'cgpa');
      animateCounter(10, 'projects');
      animateCounter(3, 'experience');
    }
  }, [isInView]);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Profile Card */}
            <div className="relative z-10">
              <motion.div
                className="w-80 h-80 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-800 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4">
                      <Code className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Zap className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Coffee className="w-6 h-6 text-brown-600" />
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4 z-10">
                    AU
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center z-10">
                    Software Engineer
                  </div>
                  <div className="flex items-center mt-2 z-10">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">3.6 CGPA</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg z-20"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-center">
                <Code className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs">DEV</div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg z-20"
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-1" />
                <div className="text-xs">2+ YRS</div>
              </div>
            </motion.div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                className="absolute top-20 -left-10 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 -right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, delay: 3 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Software Engineering Student & Full-Stack Developer
            </h3>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Software Engineering student at UCP, passionate about problem-solving, full-stack development, and SEO. 
              With 5+ years of experience in both frontend and backend technologies and a strong foundation in web design.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I love creating digital experiences that combine beautiful design with powerful functionality. 
              My goal is to build applications that not only look great but also solve real-world problems.
            </p>

            {/* Animated Counters */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <motion.div
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {counters.cgpa.toFixed(1)}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">CGPA</div>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  20+
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Projects</div>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  5+
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Years Exp</div>
              </motion.div>
            </div>

            <motion.div
              className="pt-6"
              whileHover={{ scale: 1.02 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;