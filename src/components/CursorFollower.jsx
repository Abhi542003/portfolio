import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CursorFollower = () => {
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hoverType, setHoverType] = useState('default'); // 'default', 'button', 'project', 'resume', 'contact'
  const [ripples, setRipples] = useState([]);

  // Base motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for lagging trail effects
  const springConfigMain = { damping: 28, stiffness: 380, mass: 0.35 };
  const springConfigTrail1 = { damping: 36, stiffness: 260, mass: 0.5 };
  const springConfigTrail2 = { damping: 44, stiffness: 180, mass: 0.65 };
  const springConfigTrail3 = { damping: 52, stiffness: 120, mass: 0.8 };

  const xMain = useSpring(cursorX, springConfigMain);
  const yMain = useSpring(cursorY, springConfigMain);

  const xTrail1 = useSpring(cursorX, springConfigTrail1);
  const yTrail1 = useSpring(cursorY, springConfigTrail1);

  const xTrail2 = useSpring(cursorX, springConfigTrail2);
  const yTrail2 = useSpring(cursorY, springConfigTrail2);

  const xTrail3 = useSpring(cursorX, springConfigTrail3);
  const yTrail3 = useSpring(cursorY, springConfigTrail3);

  // Stretch scale motion values while scrolling
  const cursorScaleX = useMotionValue(1);
  const cursorScaleY = useMotionValue(1);
  
  const cursorScaleXSpring = useSpring(cursorScaleX, { damping: 22, stiffness: 160 });
  const cursorScaleYSpring = useSpring(cursorScaleY, { damping: 22, stiffness: 160 });

  useEffect(() => {
    // Detect touch device (disable custom cursor on mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setHidden(false);

    // Track mouse coordinates
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Click triggers scale shrinks and spawns a ripple ring
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const triggerClickRipple = (e) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 550);
    };

    // Analyze hovered elements to determine QA icon categories
    const handleMouseEnter = (e) => {
      setLinkHovered(true);
      const el = e.currentTarget;
      
      const text = el.innerText?.toLowerCase() || '';
      const href = el.getAttribute('href')?.toLowerCase() || '';
      const classes = el.className?.toLowerCase() || '';
      const id = el.id?.toLowerCase() || '';
      
      if (el.hasAttribute('download') || href.includes('resume') || text.includes('resume')) {
        setHoverType('resume');
      } else if (href.includes('mailto') || id.includes('contact') || classes.includes('contact') || text.includes('contact')) {
        setHoverType('contact');
      } else if (classes.includes('project') || el.closest('#projects')) {
        // Project card hover
        setHoverType('project');
      } else {
        setHoverType('button');
      }
    };

    const handleMouseLeave = () => {
      setLinkHovered(false);
      setHoverType('default');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', triggerClickRipple);

    // Watch for interactive components and bind listeners
    const updateLinkListeners = () => {
      const selectors = 'a, button, input, textarea, [role="button"], select, .glass-panel, .glow-border, img, nav a, nav button, .social-icon';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateLinkListeners();

    // DOM Mutation Observer to capture newly rendered buttons/cards
    const observer = new MutationObserver(updateLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Track scroll velocity to stretch cursor vertically
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Stretch vertically while scrolling, squeeze horizontally to maintain area
      const stretch = Math.min(1 + velocity * 0.04, 1.45);
      const squeeze = Math.max(1 - velocity * 0.02, 0.72);

      cursorScaleY.set(stretch);
      cursorScaleX.set(squeeze);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        cursorScaleY.set(1);
        cursorScaleX.set(1);
      }, 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Magnetic pull effect on buttons & clickable icons (Cuberto-style)
    const handleMagneticMove = (e) => {
      const magneticEls = document.querySelectorAll('button, .social-icon, .magnetic, nav a');
      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 50) {
          // Attract element slightly towards cursor (max 8px translation)
          const pullX = (distanceX / 50) * 8;
          const pullY = (distanceY / 50) * 8;
          el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
          el.style.transition = 'transform 0.1s ease-out';
        } else {
          el.style.transform = '';
          el.style.transition = 'transform 0.3s ease-out';
        }
      });
    };
    window.addEventListener('mousemove', handleMagneticMove);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', triggerClickRipple);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMagneticMove);
      observer.disconnect();
      
      const selectors = 'a, button, input, textarea, [role="button"], select, .glass-panel, .glow-border, img, nav a, nav button';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, cursorScaleX, cursorScaleY]);

  // Returns SVG icons based on QA Theme
  const getCursorContent = () => {
    switch (hoverType) {
      case 'resume':
        return (
          <motion.svg
            key="resume"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-3.5 h-3.5 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </motion.svg>
        );
      case 'contact':
        return (
          <motion.svg
            key="contact"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-3.5 h-3.5 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </motion.svg>
        );
      case 'project':
        return (
          <motion.svg
            key="project"
            initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-3.5 h-3.5 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M8.5 5.5l1.5 1.5M15.5 5.5l-1.5 1.5M4 11h3M17 11h3M6.5 17.5l2-2M17.5 17.5l-2-2M9 7h6a3 3 0 013 3v5a3 3 0 01-3 3H9a3 3 0 01-3-3v-5a3 3 0 013-3z" />
          </motion.svg>
        );
      case 'button':
        return (
          <motion.svg
            key="checkmark"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-3 h-3 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Dynamic Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.1, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="fixed rounded-full pointer-events-none z-[999999] border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.5)] -translate-x-1/2 -translate-y-1/2 w-6 h-6"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor Trail Particles (3 Fading trailing circles) */}
      <motion.div
        className="fixed w-1 h-1 bg-purple-500/25 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[99996] blur-[0.5px]"
        style={{ x: xTrail3, y: yTrail3 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-cyan-400/30 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[99996] blur-[0.5px]"
        style={{ x: xTrail2, y: yTrail2 }}
      />
      <motion.div
        className="fixed w-3 h-3 bg-purple-500/35 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[99996] blur-[0.5px]"
        style={{ x: xTrail1, y: yTrail1 }}
      />

      {/* Main Large Glowing Backdrop (soft follow glow) */}
      <motion.div
        className="custom-cursor-glow hidden md:block"
        style={{
          x: xMain,
          y: yMain,
          scale: linkHovered ? 1.6 : 1,
          background: linkHovered
            ? (hoverType === 'project' ? 'radial-gradient(circle, rgba(248, 113, 113, 0.18) 0%, transparent 70%)' : hoverType === 'contact' ? 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, transparent 70%)')
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
        }}
      />

      {/* Outer Spring Follower Ring / Glassmorphic Ring */}
      <motion.div
        className="custom-cursor hidden md:flex items-center justify-center pointer-events-none"
        style={{
          x: xMain,
          y: yMain,
          scaleX: cursorScaleXSpring,
          scaleY: cursorScaleYSpring,
          scale: clicked ? 0.72 : linkHovered ? 2.5 : 1,
          backgroundColor: linkHovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(168, 85, 247, 0)',
          borderColor: linkHovered 
            ? (hoverType === 'project' ? 'rgba(248, 113, 113, 0.8)' : hoverType === 'contact' ? 'rgba(168, 85, 247, 0.8)' : hoverType === 'resume' ? 'rgba(34, 211, 238, 0.8)' : 'rgba(52, 211, 153, 0.8)')
            : 'rgba(168, 85, 247, 0.6)',
          borderStyle: linkHovered ? 'dashed' : 'solid',
          boxShadow: linkHovered 
            ? '0 0 25px rgba(34, 211, 238, 0.2)' 
            : '0 0 10px rgba(168, 85, 247, 0.1)',
        }}
      >
        {/* Render inside QA icon animations */}
        <AnimatePresence mode="wait">
          {linkHovered && getCursorContent()}
        </AnimatePresence>
      </motion.div>

      {/* Small glowing center dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[99999] shadow-[0_0_8px_rgba(168,85,247,0.7)]"
        style={{
          x: xMain,
          y: yMain,
          opacity: linkHovered ? 0 : 1,
          scale: clicked ? 0.6 : 1
        }}
      />
    </>
  );
};

export default CursorFollower;
