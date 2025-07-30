import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Terminal, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onTerminalToggle: () => void;
}

const Hero: React.FC<HeroProps> = ({ onTerminalToggle }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Abdullah Uzair";

  useEffect(() => {
    let index = 0;
    let animationFrameId: number;
    let lastTime = 0;
    const typeSpeed = 120; // Slower, smoother typing

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= typeSpeed) {
        if (index <= fullText.length) {
          setText(fullText.slice(0, index));
          index++;
          lastTime = currentTime;
        } else {
          setShowCursor(false);
          return;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
      {/* Minimalist Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>

        {/* Minimal floating particles */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 sm:space-y-10 md:space-y-12"
        >


          {/* Main heading with elegant typography */}
          <div className="space-y-4">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-slate-100 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hi, I'm{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {text}
                {showCursor && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-blue-500"
                  >
                    |
                  </motion.span>
                )}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-light text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Software Engineering Student & Full-Stack Developer
            </motion.p>
          </div>

          {/* Elegant Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 sm:mt-12"
          >
            <motion.div
              onClick={onTerminalToggle}
              className="inline-block bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl cursor-pointer border border-slate-800 dark:border-slate-700 overflow-hidden max-w-xl w-full mx-2 sm:mx-4 md:mx-auto hover:shadow-blue-500/10 transition-all duration-500"
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 border-b border-slate-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center ml-2 sm:ml-4">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 mr-1 sm:mr-2" />
                    <span className="text-emerald-400 font-mono text-xs sm:text-sm font-medium">AbduBot Terminal</span>
                  </div>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
                <div className="flex items-center mb-2 sm:mb-3 flex-wrap">
                  <span className="text-blue-400 font-medium text-xs sm:text-sm">abdullah@portfolio:~$</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2 text-white text-xs sm:text-sm"
                  >
                    start-conversation
                  </motion.span>
                </div>
                <div className="text-emerald-300 mb-2 sm:mb-3 text-sm sm:text-base font-medium text-center">
                  🚀 Interactive Terminal
                </div>
                <div className="text-slate-400 text-xs text-center mb-2 sm:mb-3">
                  Commands: <span className="text-yellow-400">whoami, skills, projects, help</span>
                </div>
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs flex items-center space-x-2"
                  >
                    <span>Click to start</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Elegant CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center mt-6 sm:mt-12 px-2 sm:px-4"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="group w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex justify-center space-x-3 sm:space-x-6 mt-6 sm:mt-8"
          >
            <motion.a
              href="https://www.linkedin.com/in/abdullah-uzair-2a18b9278/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:text-blue-700"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>

            <motion.a
              href="https://github.com/mabdullahuzair/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>

            <motion.a
              href="mailto:abdullahuzair860@gmail.com"
              className="p-2 sm:p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-red-600 hover:text-red-700"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="w-6 h-6 text-slate-500 dark:text-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
