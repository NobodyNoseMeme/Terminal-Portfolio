import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

const InteractiveBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simplified particle initialization
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 8; // Drastically reduced for performance

      const colors = ['#3b82f650', '#8b5cf650', '#06b6d450', '#10b98150'];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        newParticles.push({
          id: i,
          x,
          y,
          size: Math.random() * 6 + 4, // 4-10px
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.3 + 0.3, // 0.3-0.6 opacity
        });
      }

      setParticles(newParticles);
    };

    initParticles();

    // Reinitialize on window resize
    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: 'hidden' }}
    >
      {/* Simplified particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Simple gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-32 h-full bg-gradient-to-r from-indigo-500/5 to-transparent" />
      <div className="absolute top-1/2 right-0 w-32 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
    </div>
  );
};

export default InteractiveBackground;
