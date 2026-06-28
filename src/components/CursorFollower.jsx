import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorFollower = () => {
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 450, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device (hide on mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setHidden(false);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Watch for new interactive elements and bind listeners
    const updateLinkListeners = () => {
      // Buttons, Cards (glass-panel, glow-border), Images, Navigation (nav items)
      const selectors = 'a, button, input, textarea, [role="button"], select, .glass-panel, .glow-border, img, nav a, nav button';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleLinkHoverStart);
        el.addEventListener('mouseleave', handleLinkHoverEnd);
      });
    };

    updateLinkListeners();

    // Dynamically update listeners if the DOM updates
    const observer = new MutationObserver(updateLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      
      const selectors = 'a, button, input, textarea, [role="button"], select, .glass-panel, .glow-border, img, nav a, nav button';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Spring Follower Ring / Futuristic Scanner */}
      <motion.div
        className="custom-cursor hidden md:block flex items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: clicked ? 0.75 : linkHovered ? 2.5 : 1,
          backgroundColor: linkHovered ? 'rgba(34, 211, 238, 0.04)' : 'rgba(168, 85, 247, 0)',
          borderColor: linkHovered ? 'rgba(34, 211, 238, 0.85)' : 'rgba(168, 85, 247, 0.6)',
          borderStyle: linkHovered ? 'dashed' : 'solid',
        }}
      >
        {/* Futuristic Scanner crosshairs when hovered */}
        {linkHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" } }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none w-full h-full"
          >
            {/* Radar crosshair lines */}
            <div className="absolute w-[80%] h-[0.5px] bg-cyan-400/40" />
            <div className="absolute w-[0.5px] h-[80%] bg-cyan-400/40" />
            <div className="absolute top-0 left-1/2 w-[0.5px] h-1/2 bg-cyan-400/80 origin-bottom" />
          </motion.div>
        )}
      </motion.div>

      {/* Large Glowing Ambient Pointer Follower */}
      <motion.div
        className="custom-cursor-glow hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: linkHovered ? 1.5 : 1,
          background: linkHovered 
            ? 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)'
        }}
      />
    </>
  );
};

export default CursorFollower;
