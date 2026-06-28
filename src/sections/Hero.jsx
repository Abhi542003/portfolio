import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import HeroVisual from '../components/HeroVisual';
import profilePic from '../assets/profile_picture.jpg';

const ROLES = [
  'QA Automation Engineer',
  'SDET Specialist',
  'Manual Testing Expert',
  'API Testing Specialist',
  'Performance Tester'
];

// Viewport-triggered animated counter
const Counter = ({ end, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // speed up counting
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0.6);

  // Typewriter effect logic
  useEffect(() => {
    let timer;
    const activeRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before backspacing
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting ? prev.slice(0, -1) : activeRole.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Scroll indicator fade out
  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0.6 - window.scrollY / 200, 0);
      setScrollOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = 85;
      window.scrollTo({
        top: contactSection.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  // Stagger Styler Definitions
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const wordVars = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.6, 
      rotateX: -45, 
      rotateY: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0, 
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.8
      }
    }
  };

  const socials = [
    { href: "https://github.com", icon: <FaGithub className="w-5 h-5" />, label: "GitHub" },
    { href: "https://linkedin.com", icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn" },
    { href: "mailto:rajpurohitabhijit543@gmail.com", icon: <FaEnvelope className="w-5 h-5" />, label: "Email" }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-between pt-28 pb-12 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Two Column Hero Layout */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10 my-auto">
        
        {/* ================= LEFT SIDE ================= */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pr-8">
          
          {/* Profile Image with Glowing Double Rings (Pops up with Y rotation, blur and Y-axis scale bounce) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)", rotateY: 35 }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 12,
              mass: 0.9,
              delay: 0.1
            }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="relative w-40 h-40 md:w-48 md:h-48 mb-6 select-none group flex items-center justify-center cursor-none"
          >
            {/* Rotating Neon Ring with pulsing glow */}
            <motion.div
              animate={{ 
                rotate: 360,
                boxShadow: [
                  "0 0 15px rgba(168,85,247,0.4)",
                  "0 0 25px rgba(34,211,238,0.7)",
                  "0 0 15px rgba(168,85,247,0.4)"
                ]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-[-6px] rounded-full bg-gradient-to-tr from-purple-500 via-cyan-400 to-indigo-500 opacity-90 blur-[1.5px] z-0"
            />
            
            {/* Inner Spin Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-400 to-purple-400 opacity-70 blur-[2px] z-0"
            />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-200/50 dark:border-slate-800/80 shadow-2xl bg-white dark:bg-black p-0.5 z-10">
              <img
                src={profilePic}
                alt="Abhijit Rajpurohit"
                className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                draggable="false"
              />
            </div>
            {/* 🎓 Fresher QA Engineer Badge */}
            <div className="absolute bottom-[-8px] bg-slate-900/90 dark:bg-slate-950/90 border border-slate-700/60 dark:border-slate-800 py-1 px-3.5 rounded-full flex items-center space-x-1 shadow-xl z-20 text-[10px] font-bold text-white tracking-wide select-none">
              <span>🎓 Fresher QA Engineer</span>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wide"
          >
            <span>Welcome to my QA space 🛸</span>
          </motion.div>

          {/* Staggered Word by Word Heading Animations */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-1.5"
          >
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white font-heading">
              {"Hi, I'm".split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVars} className="inline-block origin-bottom-left">
                  {word}
                </motion.span>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 text-5xl md:text-7xl font-black tracking-tight leading-none font-heading">
              {"Abhijit Rajpurohit".split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={wordVars} 
                  whileHover={{
                    textShadow: "0 0 15px rgba(168,85,247,0.5)",
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block origin-bottom-left bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-[size:200%_auto] transition-all duration-500 cursor-default"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.h2 
              variants={wordVars}
              className="text-xl md:text-2xl font-bold tracking-tight text-slate-850 dark:text-slate-200 pt-2 font-heading"
            >
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-bold">QA Engineer</span> (Fresher)
            </motion.h2>
          </motion.div>

          {/* Description Paragraph (Fades in with upward slide) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="max-w-md text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body"
          >
            I am a passionate Fresher QA Engineer with hands-on internship experience in Manual Testing, Functional Testing, API Testing, Regression Testing, Bug Reporting and Test Case Design. I enjoy finding bugs before users do and ensuring software quality.
          </motion.p>

          {/* CTA Buttons (Bounces up, Glows intensifies) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
            }}
            className="flex flex-col sm:flex-row items-center space-y-3.5 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            <motion.a
              href="#contact"
              onClick={handleContactClick}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 10 }
                }
              }}
              whileHover={{ 
                scale: 1.04,
                boxShadow: "0 0 25px rgba(168,85,247,0.6)"
              }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center space-x-2 py-3.5 px-8 rounded-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-[size:200%_auto] hover:bg-[right_center] text-white shadow-lg transition-all duration-500 w-full sm:w-auto group relative overflow-hidden"
            >
              <span className="relative z-10">Let's Connect</span>
              <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              {/* Ripple shine overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.a>

            <motion.a
              href="/Abhijit_resume_QA.pdf"
              download
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 10 }
                }
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 15px rgba(34,211,238,0.3)",
                borderColor: "rgba(34,211,238,0.4)"
              }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center space-x-2 py-3.5 px-8 rounded-xl font-bold glass-panel border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all duration-300 w-full sm:w-auto group relative overflow-hidden"
            >
              <span className="relative z-10">Download Resume</span>
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300 relative z-10 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.a>
          </motion.div>

          {/* Social Icons (Pops one by one with rotation) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
            }}
            className="flex items-center space-x-3.5"
          >
            {socials.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, scale: 0.3, rotate: -45 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    transition: { type: "spring", stiffness: 120, damping: 8 }
                  }
                }}
                whileHover={{
                  scale: 1.15,
                  y: -5,
                  rotateY: 15,
                  boxShadow: "0 0 15px rgba(168,85,247,0.35)",
                  borderColor: "rgba(168,85,247,0.4)"
                }}
                className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
          <HeroVisual />
        </div>

      </div>

      {/* ================= HORIZONTAL STATISTICS CONTAINER (Individual Bouncing Glassmorphic Cards) ================= */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } }
        }}
        className="w-full z-10 mt-10 lg:mt-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Stat 1: Test Cases Written */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateY: 30, scale: 0.85 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateY: 0, 
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 12 } 
              }
            }}
            whileHover={{
              y: -8,
              rotateY: -5,
              borderColor: "rgba(168,85,247,0.45)",
              boxShadow: "0 15px 30px rgba(168,85,247,0.2)"
            }}
            className="flex items-center space-x-4 glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 15 }}
              className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner"
            >
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </motion.div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <Counter end={100} suffix="+" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Test Cases Written</div>
            </div>
          </motion.div>

          {/* Stat 2: Bugs Reported */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateY: 30, scale: 0.85 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateY: 0, 
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 12 } 
              }
            }}
            whileHover={{
              y: -8,
              rotateY: -5,
              borderColor: "rgba(244,63,94,0.45)",
              boxShadow: "0 15px 30px rgba(244,63,94,0.2)"
            }}
            className="flex items-center space-x-4 glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 15 }}
              className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 shadow-inner"
            >
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M12 2v9" />
                <path d="M8 5h8" />
                <path d="M6 14v4" />
                <path d="M18 14v4" />
              </svg>
            </motion.div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <Counter end={150} suffix="+" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Bugs Reported</div>
            </div>
          </motion.div>

          {/* Stat 3: Projects Worked On */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateY: 30, scale: 0.85 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateY: 0, 
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 12 } 
              }
            }}
            whileHover={{
              y: -8,
              rotateY: -5,
              borderColor: "rgba(59,130,246,0.45)",
              boxShadow: "0 15px 30px rgba(59,130,246,0.2)"
            }}
            className="flex items-center space-x-4 glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 15 }}
              className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner"
            >
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </motion.div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <Counter end={3} />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Projects Worked On</div>
            </div>
          </motion.div>

          {/* Stat 4: Internship Duration */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateY: 30, scale: 0.85 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateY: 0, 
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 12 } 
              }
            }}
            whileHover={{
              y: -8,
              rotateY: -5,
              borderColor: "rgba(34,211,238,0.45)",
              boxShadow: "0 15px 30px rgba(34,211,238,0.2)"
            }}
            className="flex items-center space-x-4 glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 15 }}
              className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-inner"
            >
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
              </svg>
            </motion.div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">Present</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Internship Since May 2026</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= PREMIUM MOUSE SCROLL DOWN INDICATOR (Fades out on scroll) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: scrollOpacity, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center pt-8 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pointer-events-none select-none space-y-3 relative z-10"
      >
        {/* Glowing Mouse Outline */}
        <div className="w-6 h-10 rounded-full border-2 border-slate-350 dark:border-slate-700/80 bg-slate-900/10 dark:bg-slate-950/20 backdrop-blur-sm relative flex justify-center p-1.5 shadow-[0_0_15px_rgba(168,85,247,0.06)] ring-1 ring-white/5">
          {/* Glowing Mouse Wheel moving downward */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.4, 1],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-2.5 bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full shadow-[0_0_10px_#a855f7]"
          />
        </div>
        
        {/* Pulsing Downward Arrow */}
        <div className="flex flex-col items-center">
          <motion.svg 
            animate={{ 
              opacity: [0.25, 1.0, 0.25],
              y: [0, 4, 0] 
            }} 
            transition={{ 
              duration: 2.0, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-4 h-4 text-purple-500 dark:text-purple-400 drop-shadow-[0_0_8px_#a855f7]"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </div>
        <span className="font-heading font-extrabold text-[8px] tracking-[0.2em] text-slate-500 dark:text-slate-400/80 uppercase">Scroll to explore</span>
      </motion.div>

    </section>
  );
};
export default Hero;
