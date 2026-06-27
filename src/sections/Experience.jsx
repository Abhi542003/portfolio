import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiCode } from 'react-icons/fi';

const EXPERIENCE_DATA = [
  {
    role: 'QA Intern',
    company: 'UncannyCS – Odoo Silver Partner',
    location: 'On site',
    duration: 'May 2026 – Present',
    desc: 'Performing comprehensive manual and functional QA validation across client platforms and ERP integrations.',
    responsibilities: [
      'Manual Testing: Executing exploratory and functional test suites manually across web applications.',
      'Functional & Regression Testing: Running detailed scenarios to identify bugs and check backwards compatibility.',
      'API Testing: Validating REST API endpoints, response payloads, and statuses utilizing Postman.',
      'Bug Reporting & Test Case Writing: Designing structured test cases and documenting bug logs in Jira with clear steps.',
      'Fix Validation & Teamwork: Working closely with developers and QA team to validate resolved bug fixes prior to production release.'
    ],
    tech: ['Manual Testing', 'Functional Testing', 'API Testing', 'Postman', 'Jira', 'Regression Testing', 'Bug Reporting'],
    iconType: 'briefcase'
  },
  {
    role: 'MERN Stack Intern',
    company: 'Brainy Beam Technologies',
    location: 'Remote',
    duration: 'January 2026 – April 2026',
    desc: 'Developed and integrated interactive web elements, APIs, and databases using full-stack JavaScript architectures.',
    responsibilities: [
      'Built responsive web applications using the MERN Stack.',
      'Developed reusable React.js components and managed UI states.',
      'Worked with Node.js and Express.js backend APIs.',
      'Integrated MongoDB database for secure data persistence.',
      'Fixed frontend and backend bugs to improve operational speed.',
      'Collaborated with the development team using Git workflow pipelines.',
      'Improved UI responsiveness and frontend browser rendering speeds.',
      'Learned full-stack development best practices and code standards.'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    iconType: 'code'
  }
];

// Interactive 3D Tilt Card Component
const ExperienceCard = ({ exp, idx, activeIndex, setActiveIndex, startDate, endDate }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt calculation
    const tiltX = (centerY - y) / 25;
    const tiltY = (x - centerX) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const isActive = activeIndex === idx;

  return (
    <motion.div
      id={`exp-card-${idx}`}
      onViewportEnter={() => setActiveIndex(idx)}
      viewport={{ once: false, amount: 0.65 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      className={`glass-panel p-6 md:p-8 rounded-3xl border transition-all duration-500 relative ${
        isActive 
          ? 'border-purple-500/35 dark:border-purple-500/35 bg-purple-500/[0.03] dark:bg-purple-950/[0.07] shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/20' 
          : 'border-slate-200 dark:border-slate-800 bg-white/5 dark:bg-slate-950/20 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]'
      }`}
    >
      {/* 3D Rotating Mesh Cube (Top Right) */}
      <div className="absolute top-6 right-6 z-20 pointer-events-none select-none">
        <div className="cube-container">
          <div className="cube-mesh">
            <div className={`cube-mesh-face front ${!isActive ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face back ${!isActive ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face left ${!isActive ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face right ${!isActive ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face top ${!isActive ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face bottom ${!isActive ? 'cube-blue' : ''}`} />
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className={`text-xl font-bold font-heading transition-colors duration-300 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-850 dark:text-slate-200'}`}>
            {exp.role}
          </h3>
          <p className={`font-semibold font-heading transition-colors duration-300 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-blue-500 dark:text-blue-455'}`}>
            {exp.company}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-550 dark:text-slate-400 text-xs mr-8">
          <span className={`flex items-center gap-1.5 md:hidden font-semibold transition-colors duration-300 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-blue-500 dark:text-blue-400'}`}>
            <FiCalendar className="w-3.5 h-3.5" /> {startDate} &mdash; {endDate}
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin className="w-3.5 h-3.5" /> {exp.location}
          </span>
        </div>
      </div>

      {/* Position Description */}
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed max-w-[90%] font-body">
        {exp.desc}
      </p>

      {/* Responsibilities list */}
      <ul className="list-none space-y-2 mb-6">
        {exp.responsibilities.map((resp, rIdx) => (
          <li key={rIdx} className="flex items-start text-sm text-slate-650 dark:text-slate-400 font-body">
            <span className={`mr-2.5 mt-1 text-xs transition-colors duration-300 ${isActive ? 'text-purple-500' : 'text-blue-500'}`}>•</span>
            <span>{resp}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tech.map((tag, tIdx) => (
          <span
            key={tIdx}
            className={`py-1 px-3 rounded-full text-xs font-semibold border transition-all duration-300 font-body ${
              isActive 
                ? 'bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.15)]' 
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll position relative to timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  // Interpolate scroll progress into height percentage
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto relative">
      
      {/* Decorative floating geometric shapes */}
      <div className="absolute top-10 left-5 w-24 h-24 bg-purple-500/5 rounded-full blur-xl floating-element-slow pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl floating-element pointer-events-none"></div>

      <div className="text-center mb-20 space-y-2">
        <p className="text-[11px] font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase font-heading">
          • WHAT I HAVE DONE SO FAR •
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          My <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Experience</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-body max-w-md mx-auto pt-1">
          A timeline of my professional journey and internship experience.
        </p>
      </div>

      {/* Timeline container */}
      <div ref={containerRef} className="relative ml-4 md:ml-48 pl-8 md:pl-12 space-y-12">
        {/* Static Background track */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-200 dark:bg-slate-800/85"></div>
        {/* Animated Active Glowing progress line */}
        <motion.div 
          className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-violet-500 to-cyan-550 origin-top shadow-[0_0_8px_rgba(168,85,247,0.5)] z-10"
          style={{ height: lineHeight }}
        />
        
        {EXPERIENCE_DATA.map((exp, idx) => {
          const durationParts = exp.duration.split(/–|-/);
          const startDate = durationParts[0]?.trim();
          const endDate = durationParts[1]?.trim() || '';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Circle Node (Pulsing ring) */}
              <div className={`absolute -left-[45px] md:-left-[61px] top-1.5 w-8 h-8 rounded-full border-4 bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xs shadow-md z-20 transition-all duration-300 ${
                activeIndex === idx 
                  ? 'text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-950 shadow-[0_0_12px_rgba(168,85,247,0.3)] scale-110' 
                  : 'text-blue-500 dark:text-blue-400 border-slate-200 dark:border-slate-800'
              }`}>
                {activeIndex === idx && (
                  <div className="absolute inset-0 rounded-full bg-purple-500/25 animate-ping opacity-75"></div>
                )}
                {exp.iconType === 'briefcase' ? (
                  <FiBriefcase className="w-3.5 h-3.5 relative z-10 group-hover:scale-125 transition-transform" />
                ) : (
                  <FiCode className="w-3.5 h-3.5 relative z-10 group-hover:scale-125 transition-transform" />
                )}
              </div>

              {/* Floating Date (Desktop - stacked double-line layout) */}
              <div className="hidden md:block absolute -left-[216px] top-2 w-36 text-right leading-tight font-heading">
                <div className={`font-extrabold text-sm transition-colors duration-300 ${activeIndex === idx ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{startDate}</div>
                <div className={`text-xs font-semibold mt-0.5 transition-colors duration-300 ${activeIndex === idx ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400/80 dark:text-slate-655'}`}>{endDate}</div>
              </div>

              {/* Experience Card */}
              <ExperienceCard
                exp={exp}
                idx={idx}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                startDate={startDate}
                endDate={endDate}
              />

              {/* Float Scroll/Hover Indicator next to active card */}
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="hidden xl:flex items-center space-x-3 absolute -right-[210px] top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
                  >
                    {/* Curved Dashed Indicator Path */}
                    <svg className="w-10 h-6 text-purple-500/50" fill="none" viewBox="0 0 48 24">
                      <path d="M0,12 C16,12 32,24 48,12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                      <polygon points="48,12 43,9 43,15" fill="currentColor" className="opacity-80" />
                    </svg>
                    {/* Scroll mouse UI */}
                    <div className="flex flex-col items-center bg-slate-950/80 backdrop-blur-md border border-slate-800/85 p-2 rounded-xl shadow-xl w-[86px]">
                      <div className="w-4 h-7 rounded-full border border-purple-500/60 flex justify-center p-1.5 mb-1.5">
                        <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-[7.5px] font-bold text-slate-400 tracking-wider text-center leading-tight uppercase font-heading">
                        Scroll / Hover<br />to focus
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}

      </div>

      {/* Right-Side Vertical Pagination Dots Navigation */}
      <div className="hidden lg:flex flex-col space-y-4 absolute right-6 top-1/2 -translate-y-1/2 z-30 select-none">
        {EXPERIENCE_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const card = document.getElementById(`exp-card-${idx}`);
              if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setActiveIndex(idx);
              }
            }}
            className="group relative flex items-center justify-center p-1 cursor-pointer"
            aria-label={`Scroll to experience card ${idx + 1}`}
          >
            {/* Active Dot Outer Glow Ring */}
            <span className={`absolute w-5 h-5 rounded-full border border-purple-500/40 scale-0 transition-transform duration-300 ${
              activeIndex === idx ? 'scale-100 animate-pulse' : 'group-hover:scale-75 border-slate-500/20'
            }`} />
            {/* Center Dot */}
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'bg-purple-500 scale-125 shadow-[0_0_8px_rgba(168,85,247,0.8)]' 
                : 'bg-slate-400/30 dark:bg-slate-800 hover:bg-slate-400'
            }`} />
          </button>
        ))}
      </div>

      {/* Bottom Scroll Explainer Indicator */}
      <div className="flex flex-col items-center justify-center mt-20 text-slate-500/60 select-none pointer-events-none">
        <div className="w-5 h-8 rounded-full border border-slate-700/60 flex justify-center p-1.5 mb-1.5">
          <div className="w-1 h-1 bg-purple-500/60 rounded-full animate-bounce"></div>
        </div>
        <span className="text-[9px] font-extrabold tracking-widest uppercase font-heading">
          Scroll to explore more
        </span>
      </div>

    </section>
  );
};
export default Experience;
