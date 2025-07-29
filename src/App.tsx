import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Terminal from './components/Terminal';
import Hero from './components/Hero';
import About from './components/About';
import InteractiveSkills from './components/InteractiveSkills';
import Experience from './components/Experience';
import ProjectCarousel from './components/ProjectCarousel';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      <InteractiveBackground />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar onTerminalToggle={toggleTerminal} />
              <AnimatePresence>
                {isTerminalOpen && (
                  <Terminal
                    isOpen={isTerminalOpen}
                    onClose={() => setIsTerminalOpen(false)}
                  />
                )}
              </AnimatePresence>
              <Hero onTerminalToggle={toggleTerminal} />
              <About />
              <InteractiveSkills />
              <Experience />
              <ProjectCarousel />
              <Education />
              <Contact />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
