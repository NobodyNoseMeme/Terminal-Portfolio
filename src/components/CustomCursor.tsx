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
      {/* Main cursor with simplified, responsive design */}
      <div
        className="cursor"
        style={{
          position: 'fixed',
          left: mousePosition.x - 9,
          top: mousePosition.y - 9,
          width: isHovering ? '24px' : '18px',
          height: isHovering ? '24px' : '18px',
          background: isHovering
            ? 'linear-gradient(45deg, #f59e0b, #ef4444)'
            : 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: isHovering ? '6px' : '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'all 0.1s ease-out',
          transform: isHovering ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      />

      {/* Simplified cursor trails */}
      {trails.map((trail) => (
        <div
          key={trail.id}
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
            animation: 'fadeOut 0.3s ease-out forwards',
          }}
        />
      ))}

      {/* Simple hover effect */}
      {isHovering && (
        <div
          style={{
            position: 'fixed',
            left: mousePosition.x - 14,
            top: mousePosition.y - 14,
            width: '28px',
            height: '28px',
            border: '2px solid #f59e0b',
            borderRadius: '6px',
            pointerEvents: 'none',
            zIndex: 99997,
            opacity: 0.6,
            transition: 'all 0.1s ease-out',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
