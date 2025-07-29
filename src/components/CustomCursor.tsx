import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point with reduced frequency for smoother performance
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrails(prev => [...prev.slice(-6), newTrail]); // Keep last 6 trail points
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Clean up old trail points more frequently
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrails(prev => prev.slice(-4));
    }, 50);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "easeOut"
        }}
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      />

      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 0.3,
            x: trail.x - 3,
            y: trail.y - 3,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{
            position: 'fixed',
            width: '6px',
            height: '6px',
            background: `rgba(59, 130, 246, ${0.8 - index * 0.1})`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99998,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;