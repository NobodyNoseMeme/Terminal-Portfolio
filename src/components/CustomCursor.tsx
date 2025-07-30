import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverRingRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 9}px`;
        cursorRef.current.style.top = `${e.clientY - 9}px`;
      }
      if (hoverRingRef.current) {
        hoverRingRef.current.style.left = `${e.clientX - 14}px`;
        hoverRingRef.current.style.top = `${e.clientY - 14}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'BUTTON' ||
                         target.tagName === 'A' ||
                         target.role === 'button' ||
                         target.classList.contains('cursor-pointer') ||
                         target.closest('button') !== null ||
                         target.closest('a') !== null;

      isHoveringRef.current = isClickable;

      if (cursorRef.current) {
        if (isClickable) {
          cursorRef.current.style.width = '24px';
          cursorRef.current.style.height = '24px';
          cursorRef.current.style.background = 'linear-gradient(45deg, #f59e0b, #ef4444)';
          cursorRef.current.style.borderRadius = '6px';
          cursorRef.current.style.transform = 'rotate(45deg)';
        } else {
          cursorRef.current.style.width = '18px';
          cursorRef.current.style.height = '18px';
          cursorRef.current.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
          cursorRef.current.style.borderRadius = '50%';
          cursorRef.current.style.transform = 'rotate(0deg)';
        }
      }

      if (hoverRingRef.current) {
        hoverRingRef.current.style.opacity = isClickable ? '0.6' : '0';
      }
    };

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

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
          width: '18px',
          height: '18px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'all 0.1s ease-out',
          willChange: 'transform',
        }}
      />

      {/* Hover ring */}
      <div
        ref={hoverRingRef}
        style={{
          position: 'fixed',
          width: '28px',
          height: '28px',
          border: '2px solid #f59e0b',
          borderRadius: '6px',
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: '0',
          transition: 'opacity 0.1s ease-out',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
