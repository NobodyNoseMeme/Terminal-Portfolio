import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);

  useEffect(() => {
    const duration = 2500; // Reduced to 2.5 seconds
    const interval = 50;
    const totalSteps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newProgress = (step / totalSteps) * 100;
      setProgress(newProgress);

      if (step >= totalSteps) {
        clearInterval(timer);
        setShowFinalAnimation(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 800); // Reduced final delay
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden"
      >
        {/* Minimal animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {!showFinalAnimation ? (
            <>
              {/* Simplified Logo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <motion.div
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-0.5 shadow-2xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    AU
                  </div>
                </motion.div>
              </motion.div>

              {/* Simplified text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl font-bold text-white mb-6 tracking-wide"
              >
                Abdullah Uzair
              </motion.h1>

              {/* Simple progress bar */}
              <div className="w-64 mx-auto mb-4">
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-center mt-3">
                  <motion.span
                    key={Math.round(progress)}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-white/80 text-sm font-medium"
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
              </div>
            </>
          ) : (
            /* Simple final animation */
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.6,
                }}
                className="text-4xl mb-4"
              >
                ✨
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                Welcome!
              </motion.h2>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
