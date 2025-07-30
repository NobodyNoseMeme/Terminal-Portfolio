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

  // Initialize particles and floating shapes
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 35; // Increased for more visual appeal

      const particleTypes: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];
      const colors = [
        '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
        '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'
      ];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        newParticles.push({
          id: i,
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 8 + 3, // 3-11px
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2, // 0.2-0.7 opacity
          type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
          speed: Math.random() * 0.5 + 0.2,
        });
      }

      setParticles(newParticles);
    };

    const initFloatingShapes = () => {
      const newShapes: FloatingShape[] = [];
      const shapeCount = 15; // Additional floating elements

      const shapeTypes: ('geometric' | 'orb' | 'line')[] = ['geometric', 'orb', 'line'];
      const colors = [
        'rgba(59, 130, 246, 0.1)', 'rgba(139, 92, 246, 0.1)',
        'rgba(6, 182, 212, 0.1)', 'rgba(16, 185, 129, 0.1)',
        'rgba(245, 158, 11, 0.1)', 'rgba(239, 68, 68, 0.1)'
      ];

      for (let i = 0; i < shapeCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        newShapes.push({
          id: i,
          x,
          y,
          size: Math.random() * 40 + 20, // 20-60px
          rotation: Math.random() * 360,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 30, // 30-50 seconds
        });
      }

      setFloatingShapes(newShapes);
    };

    initParticles();
    initFloatingShapes();

    // Reinitialize on window resize
    const handleResize = () => {
      initParticles();
      initFloatingShapes();
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

  // Render different particle shapes
  const renderParticleShape = (particle: Particle) => {
    const baseStyle = {
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: particle.opacity,
    };

    switch (particle.type) {
      case 'circle':
        return <div className="rounded-full" style={baseStyle} />;
      case 'square':
        return <div className="rounded-sm" style={baseStyle} />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              opacity: particle.opacity,
            }}
          />
        );
      case 'star':
        return (
          <div
            className="relative"
            style={{ width: particle.size, height: particle.size, opacity: particle.opacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: particle.color,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          </div>
        );
      default:
        return <div className="rounded-full" style={baseStyle} />;
    }
  };

  // Render floating shapes
  const renderFloatingShape = (shape: FloatingShape) => {
    const baseStyle = {
      width: shape.size,
      height: shape.size,
    };

    switch (shape.type) {
      case 'geometric':
        return (
          <div
            className="border-2 border-opacity-30"
            style={{
              ...baseStyle,
              borderColor: shape.color.replace('0.1', '0.3'),
              borderRadius: Math.random() > 0.5 ? '50%' : '8px',
            }}
          />
        );
      case 'orb':
        return (
          <div
            className="rounded-full"
            style={{
              ...baseStyle,
              background: `radial-gradient(circle, ${shape.color}, transparent)`,
              filter: 'blur(2px)',
            }}
          />
        );
      case 'line':
        return (
          <div
            style={{
              width: shape.size * 2,
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${shape.color}, transparent)`,
              borderRadius: '1px',
            }}
          />
        );
      default:
        return <div className="rounded-full" style={baseStyle} />;
    }
  };

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
