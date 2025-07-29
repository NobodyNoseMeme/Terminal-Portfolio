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

  // Optimized mouse position update with better throttling
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = performance.now();
    
    // Higher frequency updates for smoother cursor
    if (now - lastUpdateTime.current > 8) {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setMousePosition({ x: newX, y: newY });
      
      // Add optimized trail
      const trailPoint = {
        x: newX,
        y: newY,
        id: now + trailIndex.current,
        opacity: 0.8
      };
      
      setTrails(prev => {
        const newTrails = [...prev, trailPoint];
        return newTrails.slice(-6); // Keep only last 6 trails
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

  // Handle hover states
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable = target.tagName === 'BUTTON' || 
                       target.tagName === 'A' || 
                       target.role === 'button' ||
                       target.style.cursor === 'pointer' ||
                       target.classList.contains('cursor-pointer') ||
                       getComputedStyle(target).cursor === 'pointer';
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
          width: isHovering ? '24px' : '20px',
          height: isHovering ? '24px' : '20px',
          background: isHovering 
            ? 'linear-gradient(45deg, #8b5cf6, #3b82f6)' 
            : 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
        animate={{
          scale: isHovering ? [1, 1.3, 1] : [1, 1.1, 1],
        }}
        transition={{
          duration: isHovering ? 0.3 : 0.6,
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
            scale: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother animation
          }}
          style={{
            position: 'fixed',
            left: trail.x - 3,
            top: trail.y - 3,
            width: '6px',
            height: '6px',
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
          animate={{ scale: 2, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: 'fixed',
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: '40px',
            height: '40px',
            border: '2px solid #3b82f6',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99997,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
