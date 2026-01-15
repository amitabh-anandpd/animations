'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  User, 
  Settings, 
  Mail, 
  Library, 
  Heart, 
  Cloud, 
  LogOut 
} from 'lucide-react';

const VinylNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Refs for drag calculations
  const recordRef = useRef(null);
  const lastAngleRef = useRef(0);
  const previousRotationRef = useRef(0);

  // Menu Options Configuration
  const options = [
    { id: 1, label: "Dashboard", icon: LayoutDashboard },
    { id: 2, label: "Profile", icon: User },
    { id: 3, label: "Settings", icon: Settings },
    { id: 4, label: "Messages", icon: Mail },
    { id: 5, label: "Library", icon: Library },
    { id: 6, label: "Favorites", icon: Heart },
    { id: 7, label: "Cloud", icon: Cloud },
    { id: 8, label: "Logout", icon: LogOut }
  ];

  // --- Geometry Helpers ---
  const getAngle = (clientX, clientY, element) => {
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  // --- Drag Handlers ---
  const handleStart = (e) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    lastAngleRef.current = getAngle(clientX, clientY, recordRef.current);
    previousRotationRef.current = rotation;
  };

  const handleMove = useCallback((e) => {
    if (!isDragging) return;
    
    // Prevent default scroll on mobile
    if (e.touches) e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const currentAngle = getAngle(clientX, clientY, recordRef.current);
    const delta = currentAngle - lastAngleRef.current;
    
    setRotation(previousRotationRef.current + delta);
  }, [isDragging, rotation]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    previousRotationRef.current = rotation;
  }, [rotation]);

  // --- Global Event Listeners for Drag ---
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // --- Helper to handle selection ---
  const handleSelect = (label) => {
    if (!isDragging) {
      setActiveItem(label);
      // Optional: Reset active state after animation
      setTimeout(() => setActiveItem(null), 1000);
      console.log(`Navigating to: ${label}`);
    }
  };

  return (
    <>
      {/* Container covering the screen to catch clicks outside if needed, 
        or just to position the fixed nav. 
        pointer-events-none ensures we can click content underneath the empty areas.
      */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-sans">
        
        {/* Vinyl Container */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex justify-center items-center`}
          style={{
            right: isOpen ? '-45vh' : '-90vh',
            width: '90vh',
            height: '90vh'
          }}
        >
          
          {/* The Record Itself */}
          <div 
            ref={recordRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className="relative w-full h-full rounded-full cursor-grab active:cursor-grabbing shadow-[-10px_0_50px_rgba(0,0,0,0.6)]"
            style={{
              // Drag rotation logic
              transform: `rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.5s ease-out',
              // CSS Gradient for Vinyl Texture
              background: `
                radial-gradient(circle, #222 15%, transparent 16%),
                radial-gradient(circle, #111 15%, #333 16%, #111 17%, #333 18%, #111 19%, #333 20%, #111 21%, #333 22%, #111 23%, #333 24%, #111 25%, #333 26%, #111 27%, #333 28%, #111 29%, #333 30%, #111 31%, #333 32%, #111 33%, #333 34%, #111 35%, #333 36%, #111 37%, #333 38%, #111 39%, #333 40%, #111 41%, #333 42%, #111 43%, #333 44%, #111 45%, #333 46%, #111 47%, #333 48%, #111 49%, #333 50%, #111 51%, #333 52%, #111 53%, #333 54%, #111 55%, #333 56%, #111 57%, #333 58%, #111 59%, #333 60%, #111 61%, #333 62%, #111 63%, #333 64%, #111 65%, #333 66%, #111 67%, #333 68%, #111 69%, #333 70%, #000 70%)
              `
            }}
          >
            {/* Aesthetic Shine Reflection */}
            <div className="absolute inset-0 rounded-full pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45" />

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full z-20 flex items-center justify-center shadow-inner bg-gradient-to-br from-[#f5af19] to-[#f12711]">
              <span className="absolute top-[15%] text-[1.5vh] font-bold text-black/60 tracking-widest">SIDE A</span>
              <div className="w-[5%] h-[5%] bg-[#1a1a2e] rounded-full" />
              <span className="absolute bottom-[15%] text-[1.5vh] font-bold text-black/60 tracking-widest">STEREO</span>
            </div>

            {/* Render Menu Items */}
            {options.map((opt, index) => {
              const angleDeg = (360 / options.length) * index;
              return (
                <div
                  key={opt.id}
                  className="absolute top-1/2 left-1/2 w-[50%] h-[60px] flex items-center justify-end px-[12%] origin-center-left pointer-events-none"
                  style={{
                    transform: `translateY(-50%) rotate(${angleDeg}deg)`,
                    transformOrigin: 'left center',
                    boxSizing: 'border-box'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(opt.label);
                    }}
                    className={`
                      pointer-events-auto flex items-center gap-[1.5vh]
                      transition-all duration-300 group
                      /* Fix for orientation: Rotate text 180deg to read from outside-in */
                      rotate-180
                    `}
                  >
                    <span 
                      className={`
                        font-['Righteous'] text-[2.2vh] uppercase tracking-[0.1em]
                        transition-all duration-300
                        ${activeItem === opt.label ? 'text-[#e94560] scale-110 drop-shadow-[0_0_8px_rgba(233,69,96,0.8)]' : 'text-white/30 group-hover:text-[#e94560] group-hover:scale-105'}
                      `}
                      style={{ 
                        mixBlendMode: activeItem === opt.label ? 'normal' : 'plus-lighter' 
                      }}
                    >
                      {opt.label}
                    </span>
                    <opt.icon 
                      size="2.5vh" 
                      className={`
                        transition-colors duration-300
                        ${activeItem === opt.label ? 'text-[#e94560]' : 'text-white/20 group-hover:text-[#e94560]'}
                      `}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            pointer-events-auto absolute top-1/2 -translate-y-1/2 w-[60px] h-[60px] 
            rounded-full flex items-center justify-start pl-[12px] z-[60]
            bg-gradient-to-br from-[#f5af19] to-[#f12711] shadow-lg
            transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
            hover:-translate-x-1 hover:brightness-110
          `}
          style={{
            // It stays fixed relative to the screen edge, hiding halfway when closed, 
            // but we need it to blend with the record center when open.
            // Closed: Record is far right. Button sits at right: -30px.
            // Open: Record center is at right: 0. Button should align with center.
            // Actually, visually in previous version, button stayed at -30px.
            right: '-30px'
          }}
        >
          <ChevronLeft 
            size={24} 
            color="white" 
            className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
    </>
  );
};

export default VinylNav;