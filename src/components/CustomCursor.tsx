import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let currentTarget: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Magnetic pull towards center
        const pullX = (centerX - e.clientX) * 0.35;
        const pullY = (centerY - e.clientY) * 0.35;
        setPosition({ x: e.clientX + pullX, y: e.clientY + pullY });
        setMagneticOffset({ x: pullX, y: pullY });
      } else {
        setPosition({ x: e.clientX, y: e.clientY });
        setMagneticOffset({ x: 0, y: 0 });
      }

      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, input, textarea, .jelly-hover, img');
      if (target) {
        setIsHovered(true);
        currentTarget = target as HTMLElement;
      } else {
        setIsHovered(false);
        currentTarget = null;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, input, textarea, .jelly-hover, img');
      if (target && !e.relatedTarget) {
        setIsHovered(false);
        currentTarget = null;
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-screen"
        style={{
          transform: `translate(-50%, -50%) translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '48px' : '20px',
          height: isHovered ? '48px' : '20px',
          background: isHovered ? 'rgba(212, 255, 0, 0.25)' : 'rgba(219, 184, 255, 0.5)',
          boxShadow: isHovered ? '0 0 30px rgba(212, 255, 0, 0.9)' : '0 0 20px rgba(219, 184, 255, 0.8)'
        }}
      />
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-150 ease-out"
        style={{
          transform: 'translate(-50%, -50%)',
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          width: isHovered ? '60px' : '40px',
          height: isHovered ? '60px' : '40px',
          border: isHovered ? '1.5px solid rgba(212, 255, 0, 0.6)' : '1px solid rgba(219, 184, 255, 0.3)'
        }}
      />
    </>
  );
};

