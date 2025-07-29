import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Star, Heart, Coffee, Rocket } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);

  const loadingSteps = [
    { text: 'Brewing coffee...', icon: <Coffee className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' },
    { text: 'Loading creativity...', icon: <Star className="w-5 h-5" />, color: 'from-yellow-500 to-amber-500' },
    { text: 'Compiling passion...', icon: <Heart className="w-5 h-5" />, color: 'from-pink-500 to-red-500' },
    { text: 'Initializing magic...', icon: <Zap className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { text: 'Optimizing awesomeness...', icon: <Code className="w-5 h-5" />, color: 'from-blue-500 to-purple-500' },
    { text: 'Ready for takeoff!', icon: <Rocket className="w-5 h-5" />, color: 'from-green-500 to-blue-500' },
  ];

  const funFacts = [
    "🚀 Over 50+ projects completed",
    "💡 500+ hours of coding",
    "🎯 Always learning new tech",
    "☕ Powered by caffeine",
    "🌟 Passionate about clean code"
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 80;
    const totalSteps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newProgress = (step / totalSteps) * 100;
      setProgress(newProgress);

      // Update step based on progress
      const stepIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1));
      setCurrentStep(stepIndex);

      if (step >= totalSteps) {
        clearInterval(timer);
        setShowFinalAnimation(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 1500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient waves */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 60% 20%, rgba(198, 255, 119, 0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-white rounded-full opacity-20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-8 h-8 border-2 border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-6 h-6 bg-white/10 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 right-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 transform rotate-45"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {!showFinalAnimation ? (
            <>
              {/* Logo with enhanced animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  type: "spring", 
                  stiffness: 150,
                  damping: 12
                }}
                className="mb-8"
              >
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      AU
                    </div>
                  </motion.div>
                  
                  {/* Orbiting elements */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Brand Name with typewriter effect */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-4xl font-bold text-white mb-2 tracking-wide"
              >
                Abdullah Uzair
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg text-purple-200 mb-12 font-light"
              >
                Software Engineer & Creative Developer
              </motion.p>

              {/* Loading Step with Icon */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <motion.div
                    className={`p-3 rounded-full bg-gradient-to-r ${loadingSteps[currentStep]?.color} text-white shadow-lg`}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    {loadingSteps[currentStep]?.icon}
                  </motion.div>
                </div>
                <motion.p
                  className="text-white text-xl font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {loadingSteps[currentStep]?.text}
                </motion.p>
              </motion.div>

              {/* Enhanced Progress Bar */}
              <div className="w-80 mx-auto mb-6">
                <div className="relative">
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30 rounded-full"
                        animate={{ x: [-100, 400] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: 'linear' 
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-white/80">
                    <span>0%</span>
                    <motion.span
                      key={Math.round(progress)}
                      initial={{ scale: 1.2, color: '#ffffff' }}
                      animate={{ scale: 1, color: '#e5e7eb' }}
                      className="font-bold"
                    >
                      {Math.round(progress)}%
                    </motion.span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Fun Fact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center"
              >
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-purple-200 text-sm font-light"
                >
                  {funFacts[currentStep % funFacts.length]}
                </motion.p>
              </motion.div>
            </>
          ) : (
            /* Final Animation */
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  scale: { duration: 0.6, repeat: 2 },
                  rotate: { duration: 1.2 }
                }}
                className="text-6xl mb-4"
              >
                🚀
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Welcome!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-purple-200"
              >
                Let's build something amazing together
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
