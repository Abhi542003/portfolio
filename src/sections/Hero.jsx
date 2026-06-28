import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiBriefcase, FiArrowDown } from 'react-icons/fi';
import HeroVisual from '../components/HeroVisual';
import profilePic from '../assets/profile_picture.jpg';

const ROLES = [
  'QA Automation Engineer',
  'SDET Specialist',
  'Manual Testing Expert',
  'API Testing Specialist',
  'Performance Tester'
];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-between pt-28 pb-12 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Two Column Hero Layout */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10 my-auto">
        
        {/* ================= LEFT SIDE ================= */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pr-8">
          
          {/* Profile Image with Glowing Double Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-40 h-40 md:w-48 md:h-48 mb-6 select-none group flex items-center justify-center"
          >
            {/* Outer Spin Ring 1 */}
            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-tr from-purple-500 via-cyan-500 to-indigo-500 animate-spin-slow opacity-85 blur-[1px] group-hover:scale-105 transition-all duration-500"></div>
            {/* Inner Spin Ring 2 */}
            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-400 to-purple-400 animate-spin-reverse opacity-70 blur-[3px] group-hover:scale-110 transition-all duration-500"></div>
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-200/50 dark:border-slate-800/80 shadow-2xl bg-white dark:bg-black p-0.5">
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wide"
          >
            <span>Welcome to my QA space 🛸</span>
          </motion.div>

          {/* Large Typography Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1.5"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white font-heading">
              Hi, I'm
            </h1>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 font-heading">
              Abhijit Rajpurohit
            </h1>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-850 dark:text-slate-200 pt-2 font-heading">
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-bold">QA Engineer</span> (Fresher)
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body"
          >
            I am a passionate Fresher QA Engineer with hands-on internship experience in Manual Testing, Functional Testing, API Testing, Regression Testing, Bug Reporting and Test Case Design. I enjoy finding bugs before users do and ensuring software quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center space-y-3.5 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              onClick={handleContactClick}
              className="flex items-center justify-center space-x-2 py-3 px-7 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white shadow-lg glow-shadow-purple hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto group"
            >
              <span>Let's Connect</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <a
              href="/Abhijit_resume_QA.pdf"
              download
              className="flex items-center justify-center space-x-2 py-3 px-7 rounded-xl font-bold glass-panel border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-3.5"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:abhijit.rajpurohit.qa@example.com"
              className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300"
              aria-label="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </motion.div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
          <HeroVisual />
        </div>

      </div>

      {/* ================= HORIZONTAL STATISTICS CONTAINER ================= */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full z-10 mt-10 lg:mt-6"
      >
        <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Stat 1: Test Cases Written */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">100+</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Test Cases Written</div>
            </div>
          </div>

          {/* Stat 2: Bugs Reported */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 shadow-inner">
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M12 2v9" />
                <path d="M8 5h8" />
                <path d="M6 14v4" />
                <path d="M18 14v4" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">150+</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Bugs Reported</div>
            </div>
          </div>

          {/* Stat 3: Projects Worked On */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">4</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Projects Worked On</div>
            </div>
          </div>

          {/* Stat 4: Internship Duration */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-inner">
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">Present</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-heading leading-tight">Internship Since May 2026</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= BOUNCING SCROLL DOWN INDICATOR ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-center justify-center pt-8 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pointer-events-none select-none"
      >
        <span className="mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-7 h-7 rounded-full border border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center"
        >
          <FiArrowDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </motion.div>

    </section>
  );
};
export default Hero;
