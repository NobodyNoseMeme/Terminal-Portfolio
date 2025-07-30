import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([]);
  const requestRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);
  const trailIndex = useRef<number>(0);

  // Ultra-optimized mouse position update with minimal throttling
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;

    setMousePosition({ x: newX, y: newY });

    // Minimal trail creation only every few frames
    const now = performance.now();
    if (now - lastUpdateTime.current > 16) { // ~60fps
      const trailPoint = {
        x: newX,
        y: newY,
        id: now + trailIndex.current,
        opacity: 0.5
      };

      setTrails(prev => {
        const newTrails = [...prev, trailPoint];
        return newTrails.slice(-3); // Keep only last 3 trails
      });

      trailIndex.current += 1;
      lastUpdateTime.current = now;
    }
  }, []);

  // Handle mouse enter/leave for visibility
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrails([]);
  }, []);

  // Handle hover states with better performance
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable = target.tagName === 'BUTTON' ||
                       target.tagName === 'A' ||
                       target.role === 'button' ||
                       target.classList.contains('cursor-pointer') ||
                       target.closest('button') !== null ||
                       target.closest('a') !== null;
    setIsHovering(isClickable);
  }, []);

  useEffect(() => {
    // Use passive listeners for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    // Show cursor immediately on mount
    setIsVisible(true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave, handleMouseOver]);

  // Optimized trail cleanup using RAF
  useEffect(() => {
    const cleanup = () => {
      setTrails(prev => 
        prev.map(trail => ({
          ...trail,
          opacity: trail.opacity * 0.95
        })).filter(trail => trail.opacity > 0.1)
      );
      
      requestRef.current = requestAnimationFrame(cleanup);
    };
    
    requestRef.current = requestAnimationFrame(cleanup);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Don't render on mobile or when not visible
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Main cursor with enhanced visibility and smooth animation */}
      <motion.div
        className="cursor"
        style={{
          position: 'fixed',
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: isHovering ? '28px' : '18px',
          height: isHovering ? '28px' : '18px',
          background: isHovering
            ? 'linear-gradient(45deg, #f59e0b, #ef4444)'
            : 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: isHovering ? '4px' : '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'all 0.15s ease',
        }}
        animate={{
          scale: isHovering ? [1, 1.2, 1] : [1, 1.05, 1],
          rotate: isHovering ? [0, 45, 0] : 0,
        }}
        transition={{
          duration: isHovering ? 0.4 : 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced cursor trails with better performance */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          initial={{
            opacity: trail.opacity,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{
            position: 'fixed',
            left: trail.x - 2,
            top: trail.y - 2,
            width: '4px',
            height: '4px',
            background: `rgba(59, 130, 246, ${trail.opacity})`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99998,
          }}
        />
      ))}

      {/* Hover effect ring */}
      {isHovering && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 0.4 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: 'fixed',
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            width: '32px',
            height: '32px',
            border: '2px solid #f59e0b',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 99997,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
