import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  opacity: number;
  type: 'circle' | 'square' | 'triangle' | 'star';
  speed: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'geometric' | 'orb' | 'line';
  color: string;
  duration: number;
}

const InteractiveBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 25; // Small number for subtle effect
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        newParticles.push({
          id: i,
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 6 + 4, // 4-10px
          color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)],
          opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7 opacity
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

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update particle positions based on mouse
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100; // Distance at which particles start moving away
          
          if (distance < maxDistance && distance > 0) {
            // Calculate repulsion force
            const force = (maxDistance - distance) / maxDistance;
            const repulsionStrength = 30; // How far they move away
            
            const moveX = (dx / distance) * force * repulsionStrength;
            const moveY = (dy / distance) * force * repulsionStrength;
            
            return {
              ...particle,
              x: particle.baseX - moveX,
              y: particle.baseY - moveY,
            };
          } else {
            // Return to base position gradually
            const returnSpeed = 0.1;
            return {
              ...particle,
              x: particle.x + (particle.baseX - particle.x) * returnSpeed,
              y: particle.y + (particle.baseY - particle.y) * returnSpeed,
            };
          }
        })
      );
    };

    const animationFrame = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: 'hidden' }}
    >
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
            x: particle.x - particle.baseX,
            y: particle.y - particle.baseY,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 0.5,
          }}
        />
      ))}
      
      {/* Add some subtle floating shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40"
            style={{
              transform: `scale(${Math.random() * 2 + 1})`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveBackground;
