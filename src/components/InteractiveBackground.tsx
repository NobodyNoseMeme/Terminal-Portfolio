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
      {/* Enhanced interactive particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            x: particle.x - particle.baseX,
            y: particle.y - particle.baseY,
            rotate: [0, 360],
          }}
          transition={{
            x: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 },
            y: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 },
            rotate: { duration: 10 + particle.speed * 10, repeat: Infinity, ease: "linear" },
          }}
        >
          {renderParticleShape(particle)}
        </motion.div>
      ))}

      {/* Enhanced floating shapes */}
      {floatingShapes.map(shape => (
        <motion.div
          key={`floating-${shape.id}`}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(shape.rotation) * 20, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderFloatingShape(shape)}
        </motion.div>
      ))}

      {/* Additional cosmic dust particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)],
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}

      {/* Ambient light orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            background: `radial-gradient(circle, ${
              ['rgba(59, 130, 246, 0.05)', 'rgba(139, 92, 246, 0.05)', 'rgba(6, 182, 212, 0.05)'][i % 3]
            }, transparent)`,
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBackground;
