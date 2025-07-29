import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = 0;
    
    const updateMousePosition = (e: MouseEvent) => {
      const now = performance.now();
      
      // Throttle to prevent excessive updates
      if (now - lastTime > 2) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Add trail point with perfect timing
        const newTrail = { x: e.clientX, y: e.clientY, id: now };
        setTrails(prev => [...prev.slice(-6), newTrail]);
        
        lastTime = now;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Ultra-smooth cleanup using requestAnimationFrame
  useEffect(() => {
    const cleanup = () => {
      setTrails(prev => prev.slice(-4));
      requestRef.current = requestAnimationFrame(cleanup);
    };
    
    requestRef.current = requestAnimationFrame(cleanup);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor - instant follow */}
      <motion.div
        className="cursor"
        style={{
          position: 'fixed',
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: '20px',
          height: '20px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut"
        }}
      />

      {/* Perfect cursor trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ 
            opacity: 0.8, 
            scale: 1,
            x: trail.x - 3,
            y: trail.y - 3,
          }}
          animate={{ 
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: 0.12,
            ease: "easeOut",
          }}
          style={{
            position: 'fixed',
            width: '6px',
            height: '6px',
            background: `rgba(59, 130, 246, ${0.9 - index * 0.15})`,
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
