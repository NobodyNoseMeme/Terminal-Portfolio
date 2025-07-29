import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point with higher frequency for smoother trails
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrails(prev => [...prev.slice(-3), newTrail]); // Keep last 3 trail points for smoother performance
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Clean up old trail points very frequently for smooth performance
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrails(prev => prev.slice(-2));
    }, 16); // 60fps cleanup

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
          type: "spring",
          damping: 30,
          stiffness: 800,
          mass: 0.5
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
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            position: 'fixed',
            width: '6px',
            height: '6px',
            background: `rgba(59, 130, 246, ${0.6 - index * 0.2})`,
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