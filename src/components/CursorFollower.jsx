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
      const links = document.querySelectorAll('a, button, input, textarea, [role="button"], select');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleLinkHoverStart);
        link.addEventListener('mouseleave', handleLinkHoverEnd);
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
      
      const links = document.querySelectorAll('a, button, input, textarea, [role="button"], select');
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="custom-cursor hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: clicked ? 0.75 : linkHovered ? 2.2 : 1,
          backgroundColor: linkHovered ? 'rgba(168, 85, 247, 0.12)' : 'rgba(168, 85, 247, 0)',
          borderColor: linkHovered ? 'rgba(34, 211, 238, 0.8)' : 'rgba(168, 85, 247, 0.6)'
        }}
      />
      {/* Large Glowing Ambient Pointer Follower */}
      <motion.div
        className="custom-cursor-glow hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
};
export default CursorFollower;
