import React, { useEffect, useRef, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverRingRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const isHoveringRef = useRef(false);

  // Ultra-fast position update with requestAnimationFrame
  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 9}px, ${positionRef.current.y - 9}px, 0)`;
    }
    if (hoverRingRef.current) {
      hoverRingRef.current.style.transform = `translate3d(${positionRef.current.x - 14}px, ${positionRef.current.y - 14}px, 0)`;
    }
  }, []);

  useEffect(() => {
    // Skip on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return;
    }

    let rafId: number;
    let lastTime = 0;

    const updatePosition = (e: MouseEvent) => {
      const now = performance.now();

      // Throttle to 60fps for better performance
      if (now - lastTime >= 16) {
        positionRef.current.x = e.clientX;
        positionRef.current.y = e.clientY;

        // Cancel previous frame
        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        // Schedule update for next frame
        rafId = requestAnimationFrame(updateCursorPosition);
        lastTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Skip processing if target is inside terminal to prevent lag
      const isInsideTerminal = target.closest('[data-terminal-overlay]');
      if (isInsideTerminal) {
        return;
      }

      // Enhanced button detection with better targeting
      const isClickable = target.tagName === 'BUTTON' ||
                         target.tagName === 'A' ||
                         target.role === 'button' ||
                         target.classList.contains('cursor-pointer') ||
                         target.classList.contains('hover-3d') ||
                         target.classList.contains('hover-3d-nav') ||
                         target.closest('button') !== null ||
                         target.closest('a') !== null ||
                         target.closest('[role="button"]') !== null;

      isHoveringRef.current = isClickable;

      if (cursorRef.current) {
        if (isClickable) {
          cursorRef.current.style.width = '28px';
          cursorRef.current.style.height = '28px';
          cursorRef.current.style.background = 'linear-gradient(45deg, #f59e0b, #ef4444)';
          cursorRef.current.style.borderRadius = '8px';
          cursorRef.current.style.rotate = '45deg';
          cursorRef.current.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
        } else {
          cursorRef.current.style.width = '18px';
          cursorRef.current.style.height = '18px';
          cursorRef.current.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
          cursorRef.current.style.borderRadius = '50%';
          cursorRef.current.style.rotate = '0deg';
          cursorRef.current.style.boxShadow = 'none';
        }
      }

      if (hoverRingRef.current) {
        hoverRingRef.current.style.opacity = isClickable ? '0.7' : '0';
        hoverRingRef.current.style.transform = `translate3d(${positionRef.current.x - (isClickable ? 16 : 14)}px, ${positionRef.current.y - (isClickable ? 16 : 14)}px, 0)`;
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Initialize position
    const initPosition = () => {
      if (cursorRef.current && hoverRingRef.current) {
        cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
        hoverRingRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
      }
    };
    initPosition();

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateCursorPosition]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '18px',
          height: '18px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'all 0.06s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
          contain: 'layout style paint',
        }}
      />

      {/* Enhanced hover ring */}
      <div
        ref={hoverRingRef}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '32px',
          height: '32px',
          border: '2px solid #f59e0b',
          borderRadius: '8px',
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: '0',
          transition: 'all 0.06s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
          contain: 'layout style paint',
          boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
        }}
      />
    </>
  );
};

export default CustomCursor;
